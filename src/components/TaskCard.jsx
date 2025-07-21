import { useState } from 'react';
import {
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import {
  getTimeDisplay,
  getUrgencyLevel,
  getUrgencyColor,
  getStatusBadgeColor,
  TASK_STATUS,
} from '../utils/taskUtils';
import {
  showDeleteConfirmationToast,
  showTaskDeletedToast,
  showTaskErrorToast,
} from '../utils/toastUtils.jsx';
import TaskForm from './TaskForm';

const TaskCard = ({
  task,
  onUpdate,
  onDelete,
  onToggleCompletion,
  isLoading = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Calculate task properties
  const urgencyLevel = getUrgencyLevel(task);
  const urgencyColor = getUrgencyColor(urgencyLevel);
  const statusBadgeColor = getStatusBadgeColor(task.currentStatus);
  const timeDisplay = getTimeDisplay(task);

  // Event handlers
  const handleToggleCompletion = async () => {
    if (isLoading) return;
    await onToggleCompletion(task);
  };

  const handleUpdate = async updatedData => {
    const formattedData = {
      title: updatedData.title,
      description: updatedData.description || '',
      deadline: new Date(updatedData.deadline).toISOString(),
    };
    await onUpdate({ id: task.id, taskData: formattedData });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    showDeleteConfirmationToast(
      task.title,
      async () => {
        setIsDeleting(true);
        try {
          await onDelete(task.id);
          showTaskDeletedToast();
        } catch {
          showTaskErrorToast('delete');
        } finally {
          setIsDeleting(false);
        }
      },
      () => {}
    );
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Keyboard event handlers for accessibility
  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  const renderStatusIcon = () => {
    const iconProps = { className: 'w-5 h-5' };

    switch (task.currentStatus) {
      case TASK_STATUS.SUCCESS:
        return (
          <CheckCircle
            {...iconProps}
            className='w-5 h-5 text-green-600 dark:text-green-400'
            aria-hidden='true'
          />
        );
      case TASK_STATUS.FAILURE:
        return (
          <XCircle
            {...iconProps}
            className='w-5 h-5 text-red-600 dark:text-red-400'
            aria-hidden='true'
          />
        );
      case TASK_STATUS.ONGOING:
        return (
          <Clock
            {...iconProps}
            className='w-5 h-5 text-blue-600 dark:text-blue-400'
            aria-hidden='true'
          />
        );
      default:
        return (
          <Clock
            {...iconProps}
            className='w-5 h-5 text-gray-600 dark:text-gray-400'
            aria-hidden='true'
          />
        );
    }
  };

  const renderUrgencyIcon = () => {
    if (urgencyLevel === 'overdue' || urgencyLevel === 'critical') {
      return (
        <AlertCircle
          className='w-4 h-4 text-red-500 dark:text-red-400'
          aria-hidden='true'
        />
      );
    }
    return null;
  };

  const renderActionButtons = () => (
    <div
      className='flex items-center gap-2'
      role='group'
      aria-label='Task actions'
    >
      <button
        onClick={handleEditClick}
        onKeyDown={e => handleKeyDown(e, handleEditClick)}
        className='p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded'
        title='Edit task'
        disabled={isLoading}
        aria-label={`Edit task: ${task.title}`}
        tabIndex={0}
      >
        <Edit className='w-4 h-4' aria-hidden='true' />
      </button>
      <button
        onClick={handleDelete}
        onKeyDown={e => handleKeyDown(e, handleDelete)}
        disabled={isDeleting || isLoading}
        className='p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded'
        title='Delete task'
        aria-label={`Delete task: ${task.title}`}
        tabIndex={0}
      >
        {isDeleting ? (
          <div
            className='w-4 h-4 border-2 border-red-600 dark:border-red-400 border-t-transparent rounded-full animate-spin'
            aria-hidden='true'
          />
        ) : (
          <Trash2 className='w-4 h-4' aria-hidden='true' />
        )}
      </button>
    </div>
  );

  const renderCompletionToggle = () => {
    const isCompleted = task.isCompleted;
    const toggleClasses = [
      'mt-1 flex-shrink-0 w-5 h-5 rounded border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
      isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ];

    if (isCompleted) {
      toggleClasses.push(
        'bg-green-600 border-green-600 text-white dark:bg-green-500 dark:border-green-500'
      );
    } else {
      toggleClasses.push(
        'border-gray-300 dark:border-gray-600 hover:border-green-600 dark:hover:border-green-500'
      );
    }

    return (
      <button
        onClick={handleToggleCompletion}
        onKeyDown={e => handleKeyDown(e, handleToggleCompletion)}
        disabled={isLoading}
        className={toggleClasses.join(' ')}
        aria-label={`${isCompleted ? 'Mark as incomplete' : 'Mark as complete'}: ${task.title}`}
        aria-checked={isCompleted}
        role='checkbox'
        tabIndex={0}
      >
        {isCompleted && <CheckCircle className='w-4 h-4' aria-hidden='true' />}
      </button>
    );
  };

  const renderTaskContent = () => (
    <div className='flex-1'>
      <h3
        className={`font-medium text-foreground mb-1 ${
          task.isCompleted ? 'line-through text-muted-foreground' : ''
        }`}
      >
        {task.title}
      </h3>

      {task.description && (
        <p
          className={`text-sm text-muted-foreground mb-2 ${
            task.isCompleted ? 'line-through' : ''
          }`}
        >
          {task.description}
        </p>
      )}
    </div>
  );

  const renderTimeDisplay = () => {
    const timeClasses = ['font-medium'];

    if (urgencyLevel === 'overdue' || urgencyLevel === 'critical') {
      timeClasses.push('text-red-600 dark:text-red-400');
    } else if (urgencyLevel === 'urgent') {
      timeClasses.push('text-yellow-600 dark:text-yellow-400');
    } else {
      timeClasses.push('text-muted-foreground');
    }

    return (
      <div
        className='flex items-center gap-2 text-sm'
        aria-label={`Task deadline: ${timeDisplay}`}
      >
        <Clock className='w-4 h-4 text-muted-foreground' aria-hidden='true' />
        <span className={timeClasses.join(' ')}>{timeDisplay}</span>
      </div>
    );
  };

  const renderMetadata = () => (
    <div className='mt-3 pt-3 border-t border-border'>
      <p className='text-xs text-muted-foreground'>
        Created: {new Date(task.createdAt).toLocaleDateString()}
        {task.updatedAt !== task.createdAt && (
          <span className='ml-2'>
            • Updated: {new Date(task.updatedAt).toLocaleDateString()}
          </span>
        )}
      </p>
    </div>
  );

  if (isEditing) {
    return (
      <div className='mb-4' role='region' aria-label='Edit task form'>
        <TaskForm
          task={task}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          isLoading={isLoading}
        />
      </div>
    );
  }

  return (
    <div
      className={`card mb-4 border-l-4 ${urgencyColor} animate-slide-up hover:shadow-md transition-shadow task-card ${
        task.isCompleted ? 'task-card-completed' : ''
      }`}
      role='article'
      aria-label={`Task: ${task.title}. Status: ${task.currentStatus}. ${timeDisplay}`}
      tabIndex={0}
    >
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          {/* Header with status and actions */}
          <div className='flex items-center justify-between mb-3'>
            <div
              className='flex items-center gap-2'
              role='group'
              aria-label='Task status'
            >
              {renderStatusIcon()}
              <span className={`badge ${statusBadgeColor}`}>
                {task.currentStatus.charAt(0).toUpperCase() +
                  task.currentStatus.slice(1)}
              </span>
              {renderUrgencyIcon()}
            </div>

            {renderActionButtons()}
          </div>

          {/* Task content */}
          <div className='flex items-start gap-3 mb-3'>
            {renderCompletionToggle()}
            {renderTaskContent()}
          </div>

          {/* Time and metadata */}
          {renderTimeDisplay()}
          {renderMetadata()}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
