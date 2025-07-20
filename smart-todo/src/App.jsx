import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import TaskModal from './components/TaskModal';
import TaskBucket from './components/TaskBucket';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask, useToggleTaskCompletion } from './hooks/useTasks';
import { TASK_STATUS } from './utils/taskUtils';
import { 
  showTaskCreatedToast, 
  showTaskUpdatedToast, 
  showTaskToggleToast, 
  showTaskErrorToast 
} from './utils/toastUtils.jsx';

// Initialize query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // 30 seconds
      retry: 1,
    },
  },
});

const TodoApp = () => {
  // Custom hooks for data management
  const { tasks, isLoading, error } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const toggleCompletion = useToggleTaskCompletion();

  // Event handlers for task operations
  const handleCreateTask = async (taskData) => {
    try {
      await createTask.mutateAsync(taskData);
      showTaskCreatedToast();
    } catch (error) {
      console.error('Failed to create task:', error);
      showTaskErrorToast('create');
    }
  };

  const handleUpdateTask = async ({ id, taskData }) => {
    try {
      await updateTask.mutateAsync({ id, taskData });
      showTaskUpdatedToast();
    } catch (error) {
      console.error('Failed to update task:', error);
      showTaskErrorToast('update');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask.mutateAsync(id);
      // Toast notification is handled in TaskCard component
    } catch (error) {
      console.error('Failed to delete task:', error);
      showTaskErrorToast('delete');
    }
  };

  const handleToggleCompletion = async (task) => {
    try {
      await toggleCompletion.toggleCompletion(task);
      const action = task.isCompleted ? 'unmarked' : 'marked as complete';
      showTaskToggleToast(!task.isCompleted);
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
      showTaskErrorToast('update');
    }
  };

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Tasks</h1>
          <p className="text-foreground mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Render main application
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Application Header */}
        <AppHeader />
        
        {/* Task Creation Section */}
        <TaskCreationSection 
          onCreateTask={handleCreateTask}
          isLoading={createTask.isPending}
        />

        {/* Task Management Section */}
        <TaskManagementSection 
          tasks={tasks}
          isLoading={isLoading}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onToggleCompletion={handleToggleCompletion}
        />
      </div>
    </div>
  );
};

// Header component with theme toggle
const AppHeader = () => (
  <div className="text-center mb-4 relative">
    <div className="absolute top-0 right-0">
      <ThemeToggle />
    </div>
    <h1 className="text-4xl font-bold text-foreground mb-2">Smart Todo App</h1>
    <p className="text-muted-foreground">Organize your tasks efficiently</p>
  </div>
);

// Task creation section
const TaskCreationSection = ({ onCreateTask, isLoading }) => (
  <div className="mb-8 flex justify-end">
    <TaskModal
      onSubmit={onCreateTask}
      isLoading={isLoading}
    />
  </div>
);

// Task management section with buckets
const TaskManagementSection = ({ 
  tasks, 
  isLoading, 
  onUpdateTask, 
  onDeleteTask, 
  onToggleCompletion 
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <TaskBucket
      title="Active Tasks"
      status={TASK_STATUS.ONGOING}
      tasks={tasks}
      onUpdate={onUpdateTask}
      onDelete={onDeleteTask}
      onToggleCompletion={onToggleCompletion}
      isLoading={isLoading}
    />
    
    <TaskBucket
      title="Completed Tasks"
      status={TASK_STATUS.SUCCESS}
      tasks={tasks}
      onUpdate={onUpdateTask}
      onDelete={onDeleteTask}
      onToggleCompletion={onToggleCompletion}
      isLoading={isLoading}
    />
    
    <TaskBucket
      title="Overdue Tasks"
      status={TASK_STATUS.FAILURE}
      tasks={tasks}
      onUpdate={onUpdateTask}
      onDelete={onDeleteTask}
      onToggleCompletion={onToggleCompletion}
      isLoading={isLoading}
    />
  </div>
);

// Main App component with providers
const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TodoApp />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'hsl(var(--card))',
              color: 'hsl(var(--card-foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
