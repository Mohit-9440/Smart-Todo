import { formatDistanceToNow, isAfter, isBefore, parseISO } from 'date-fns';

// Task status categories as per assignment requirements
export const TASK_STATUS = {
  ONGOING: 'ongoing',
  SUCCESS: 'success', 
  FAILURE: 'failure'
};

// Map database column names to API contract names
export const mapTaskFromDatabase = (task) => {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    deadline: new Date(task.deadline).toISOString(), // Convert to proper ISO format
    isCompleted: task.is_completed,
    createdAt: new Date(task.created_at).toISOString(), // Convert to proper ISO format
    updatedAt: new Date(task.updated_at).toISOString(), // Convert to proper ISO format
  };
};

// Map API contract names to database column names
export const mapTaskToDatabase = (task) => {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    deadline: task.deadline,
    is_completed: task.isCompleted,
    created_at: task.createdAt,
    updated_at: task.updatedAt,
  };
};

// Determine task status based on completion and deadline
export const getTaskStatus = (task) => {
  const now = new Date();
  const deadline = parseISO(task.deadline);
  
  if (task.isCompleted) {
    return TASK_STATUS.SUCCESS;
  }
  
  if (isBefore(deadline, now)) {
    return TASK_STATUS.FAILURE;
  }
  
  return TASK_STATUS.ONGOING;
};

// Get time display for task (countdown or overdue)
export const getTimeDisplay = (task) => {
  const now = new Date();
  const deadline = parseISO(task.deadline);
  
  if (task.isCompleted) {
    return 'Completed';
  }
  
  if (isBefore(deadline, now)) {
    return `Overdue by ${formatDistanceToNow(deadline)}`;
  }
  
  return `Due in ${formatDistanceToNow(deadline)}`;
};

// Get urgency level for styling
export const getUrgencyLevel = (task) => {
  const now = new Date();
  const deadline = parseISO(task.deadline);
  
  if (task.isCompleted) return 'completed';
  
  const hoursUntilDeadline = (deadline - now) / (1000 * 60 * 60);
  
  if (isBefore(deadline, now)) return 'overdue';
  if (hoursUntilDeadline <= 1) return 'critical';
  if (hoursUntilDeadline <= 24) return 'urgent';
  if (hoursUntilDeadline <= 72) return 'warning';
  
  return 'normal';
};

// Filter tasks by status
export const filterTasksByStatus = (tasks, status) => {
  return tasks.filter(task => getTaskStatus(task) === status);
};

// Sort tasks by deadline (earliest first)
export const sortTasksByDeadline = (tasks) => {
  return [...tasks].sort((a, b) => {
    const deadlineA = parseISO(a.deadline);
    const deadlineB = parseISO(b.deadline);
    return deadlineA - deadlineB;
  });
};

// Get status badge color
export const getStatusBadgeColor = (status) => {
  switch (status) {
    case TASK_STATUS.ONGOING:
      return 'badge-ongoing';
    case TASK_STATUS.SUCCESS:
      return 'badge-success';
    case TASK_STATUS.FAILURE:
      return 'badge-failure';
    default:
      return 'badge-ongoing';
  }
};

// Get urgency color for task cards
export const getUrgencyColor = (urgencyLevel) => {
  switch (urgencyLevel) {
    case 'overdue':
      return 'border-l-danger-500';
    case 'critical':
      return 'border-l-danger-400';
    case 'urgent':
      return 'border-l-warning-500';
    case 'warning':
      return 'border-l-warning-400';
    case 'completed':
      return 'border-l-success-500';
    default:
      return 'border-l-primary-500';
  }
}; 