import toast from 'react-hot-toast';

// Success toasts
export const showSuccessToast = (message) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: 'hsl(var(--card))',
      color: 'hsl(var(--card-foreground))',
      border: '1px solid hsl(var(--border))',
      borderRadius: '8px',
      fontSize: '14px',
    },
  });
};

// Error toasts
export const showErrorToast = (message) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: 'hsl(var(--card))',
      color: 'hsl(var(--card-foreground))',
      border: '1px solid hsl(var(--border))',
      borderRadius: '8px',
      fontSize: '14px',
    },
  });
};

// Loading toasts
export const showLoadingToast = (message) => {
  return toast.loading(message, {
    position: 'top-right',
    style: {
      background: 'hsl(var(--card))',
      color: 'hsl(var(--card-foreground))',
      border: '1px solid hsl(var(--border))',
      borderRadius: '8px',
      fontSize: '14px',
    },
  });
};

// Task-specific toasts
export const showTaskCreatedToast = () => {
  showSuccessToast('Task created successfully!');
};

export const showTaskUpdatedToast = () => {
  showSuccessToast('Task updated successfully!');
};

export const showTaskDeletedToast = () => {
  showSuccessToast('Task deleted successfully!');
};

export const showTaskToggleToast = (isCompleted) => {
  const action = isCompleted ? 'marked as complete' : 'unmarked';
  showSuccessToast(`Task ${action}!`);
};

export const showTaskErrorToast = (action) => {
  showErrorToast(`Failed to ${action} task. Please try again.`);
};

// Delete confirmation toast
export const showDeleteConfirmationToast = (taskTitle, onConfirm, onCancel) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-card shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-border`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-foreground">Delete Task</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Are you sure you want to delete "{taskTitle}"?
              </p>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                onConfirm();
              }}
              className="flex-1 bg-red-600 text-white text-sm font-medium py-2 px-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-500 dark:hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                onCancel();
              }}
              className="flex-1 bg-gray-300 text-gray-700 text-sm font-medium py-2 px-3 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    ),
    {
      duration: Infinity,
      position: 'top-right',
    }
  );
}; 