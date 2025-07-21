import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import TaskModal from "./components/TaskModal";
import TaskBucket from "./components/TaskBucket";
import SearchComponent from "./components/Search";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./contexts/ThemeContext";
import {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
  useToggleTaskCompletion,
} from "./hooks/useTasks";
import { TASK_STATUS } from "./utils/taskUtils";
import {
  showTaskCreatedToast,
  showTaskUpdatedToast,
  showTaskToggleToast,
  showTaskErrorToast,
} from "./utils/toastUtils.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 1,
    },
  },
});

const TodoApp = () => {
  const [searchedTasks, setSearchedTasks] = useState([]);

  const { tasks, isLoading, error } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const toggleCompletion = useToggleTaskCompletion();
  useEffect(() => {
    if (!isLoading && tasks.length > 0) {
      setSearchedTasks((prev) =>
        JSON.stringify(prev) !== JSON.stringify(tasks) ? tasks : prev
      );
    }
  }, [tasks, isLoading]);

  const handleSearchChange = (newSearchedTasks) => {
    setSearchedTasks(newSearchedTasks);
  };

  const handleCreateTask = async (taskData) => {
    try {
      await createTask.mutateAsync(taskData);
      showTaskCreatedToast();
    } catch (error) {
      console.error("Failed to create task:", error);
      showTaskErrorToast("create");
    }
  };

  const handleUpdateTask = async ({ id, taskData }) => {
    try {
      await updateTask.mutateAsync({ id, taskData });
      showTaskUpdatedToast();
    } catch (error) {
      console.error("Failed to update task:", error);
      showTaskErrorToast("update");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask.mutateAsync(id);
    } catch (error) {
      console.error("Failed to delete task:", error);
      showTaskErrorToast("delete");
    }
  };

  const handleToggleCompletion = async (task) => {
    try {
      await toggleCompletion.toggleCompletion(task);
      const action = task.isCompleted ? "unmarked" : "marked as complete";
      showTaskToggleToast(!task.isCompleted);
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
      showTaskErrorToast("update");
    }
  };

  // Render main application
  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="custom-animated-background">
        <div className="orb-1"></div>
        <div className="orb-2"></div>
        <div className="orb-3"></div>
        <div className="pattern"></div>
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="bottom-gradient">
          <div></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <AppHeader />

          <SearchAndCreateSection
            tasks={tasks}
            onSearchChange={handleSearchChange}
            isLoading={isLoading}
            onCreateTask={handleCreateTask}
            isCreateLoading={createTask.isPending}
          />

          {/* Task Management Section */}
          <TaskManagementSection
            tasks={searchedTasks}
            isLoading={isLoading}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onToggleCompletion={handleToggleCompletion}
          />
        </div>
      </div>
    </div>
  );
};

// Header component with dark mode
const AppHeader = () => (
  <div className="text-center mb-8 relative">
    <div className="absolute top-0 right-0">
      <ThemeToggle />
    </div>
    <h1 className="text-3xl font-bold text-foreground mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      Smart Todo App
    </h1>
    <p className="text-base text-muted-foreground">
      Organize your tasks efficiently
    </p>
  </div>
);

const SearchAndCreateSection = ({
  tasks,
  onSearchChange,
  isLoading,
  onCreateTask,
  isCreateLoading,
}) => (
  <div className="mb-8 flex flex-col lg:flex-row gap-4 items-start">
    <div className="flex-1">
      <SearchComponent
        tasks={tasks}
        onSearchChange={onSearchChange}
        isLoading={isLoading}
      />
    </div>
    <div>
      <TaskModal onSubmit={onCreateTask} isLoading={isCreateLoading} />
    </div>
  </div>
);

// Task management section with buckets
const TaskManagementSection = ({
  tasks,
  isLoading,
  onUpdateTask,
  onDeleteTask,
  onToggleCompletion,
}) => (
  <div>
    {/* Task Buckets */}
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
  </div>
);

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
              background: "hsl(var(--card))",
              color: "hsl(var(--card-foreground))",
              border: "1px solid hsl(var(--border))",
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
