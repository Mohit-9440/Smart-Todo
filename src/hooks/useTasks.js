import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import api from '../services/apiFactory';
import { getTaskStatus, TASK_STATUS } from '../utils/taskUtils';

// Query keys
export const taskKeys = {
  all: ['tasks'],
  lists: () => [...taskKeys.all, 'list'],
  list: (filters) => [...taskKeys.lists(), { filters }],
  details: () => [...taskKeys.all, 'detail'],
  detail: (id) => [...taskKeys.details(), id],
};

// Custom hook for tasks with real-time status updates
export const useTasks = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update current time every minute for real-time status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  const query = useQuery({
    queryKey: taskKeys.lists(),
    queryFn: async () => {
      const response = await api.getTasks();
      return response.data;
    },
    staleTime: 30000, // Consider data stale after 30 seconds
    refetchInterval: 60000, // Refetch every minute for real-time updates
  });

  // Process tasks with current time for accurate status
  const processedTasks = query.data?.map(task => ({
    ...task,
    currentStatus: getTaskStatus(task),
  })) || [];

  return {
    ...query,
    tasks: processedTasks,
    currentTime,
  };
};

// Hook for creating tasks
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (taskData) => {
      const response = await api.createTask(taskData);
      return response.data;
    },
    onSuccess: (newTask) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to create task:', error);
    },
  });
};

// Hook for updating tasks
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, taskData }) => {
      const response = await api.updateTask(id, taskData);
      return response.data;
    },
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to update task:', error);
    },
  });
};

// Hook for deleting tasks
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      const response = await api.deleteTask(id);
      return response.data;
    },
    onSuccess: (deletedTask) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete task:', error);
    },
  });
};

// Hook for toggling task completion
export const useToggleTaskCompletion = () => {
  const updateTask = useUpdateTask();
  
  return {
    toggleCompletion: (task) => {
      return updateTask.mutate({
        id: task.id,
        taskData: { isCompleted: !task.isCompleted }
      });
    },
    isLoading: updateTask.isPending,
    error: updateTask.error,
  };
}; 