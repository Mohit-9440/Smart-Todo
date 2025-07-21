import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { TASK_STATUS, filterTasksByStatus, sortTasksByDeadline } from '../utils/taskUtils';
import TaskCard from './TaskCard';

const TaskBucket = ({ 
  title, 
  status, 
  tasks, 
  onUpdate, 
  onDelete, 
  onToggleCompletion,
  isLoading = false 
}) => {
  // Process tasks for this bucket
  const filteredTasks = filterTasksByStatus(tasks, status);
  const sortedTasks = sortTasksByDeadline(filteredTasks);

  // Get bucket-specific styling and content
  const bucketConfig = getBucketConfig(status);

  // Render bucket icon based on status
  const renderBucketIcon = () => {
    const IconComponent = bucketConfig.icon;
    return <IconComponent className="w-5 h-5" />;
  };

  // Render empty state
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      {bucketConfig.emptyIcon}
      <p className="mt-2 text-sm text-muted-foreground max-w-xs">
        {bucketConfig.emptyMessage}
      </p>
    </div>
  );

  // Render loading state
  const renderLoadingState = () => (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center gap-2 text-muted-foreground">
        <div className="w-4 h-4 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
        <span>Loading tasks...</span>
      </div>
    </div>
  );

  // Render task list
  const renderTaskList = () => (
    <div className="space-y-3">
      {sortedTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleCompletion={onToggleCompletion}
          isLoading={isLoading}
        />
      ))}
    </div>
  );

  // Render bucket content based on state
  const renderBucketContent = () => {
    if (isLoading) {
      return renderLoadingState();
    }
    
    if (sortedTasks.length === 0) {
      return renderEmptyState();
    }
    
    return renderTaskList();
  };

  return (
    <div className={`rounded-lg border ${bucketConfig.containerClasses} p-4 animate-fade-in`}>
      {/* Bucket Header */}
      <div className="flex items-center gap-2 mb-4">
        {renderBucketIcon()}
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <span className="badge bg-background text-foreground border border-border">
          {sortedTasks.length}
        </span>
      </div>

      {/* Bucket Content */}
      <div className="space-y-3">
        {renderBucketContent()}
      </div>
    </div>
  );
};

// Configuration object for different bucket types
const getBucketConfig = (status) => {
  const configs = {
    [TASK_STATUS.ONGOING]: {
      icon: Clock,
      containerClasses: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20 bucket-ongoing',
      emptyIcon: <Clock className="w-8 h-8 text-blue-400 dark:text-blue-500" />,
      emptyMessage: 'No active tasks. Create a new task to get started!'
    },
    [TASK_STATUS.SUCCESS]: {
      icon: CheckCircle,
      containerClasses: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20 bucket-success',
      emptyIcon: <CheckCircle className="w-8 h-8 text-green-400 dark:text-green-500" />,
      emptyMessage: 'No completed tasks yet. Mark tasks as complete to see them here.'
    },
    [TASK_STATUS.FAILURE]: {
      icon: XCircle,
      containerClasses: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20 bucket-failure',
      emptyIcon: <XCircle className="w-8 h-8 text-red-400 dark:text-red-500" />,
      emptyMessage: 'No overdue tasks. Great job staying on top of deadlines!'
    }
  };

  return configs[status] || {
    icon: Clock,
    containerClasses: 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800',
    emptyIcon: <AlertTriangle className="w-8 h-8 text-gray-400 dark:text-gray-500" />,
    emptyMessage: 'No tasks in this category.'
  };
};

export default TaskBucket; 