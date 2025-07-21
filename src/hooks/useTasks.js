import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import api from '../services/apiFactory';
import { getTaskStatus, TASK_STATUS } from '../utils/taskUtils';

// Query keys
export const taskKeys = {
  all: ['tasks'],
  lists: () => [...taskKeys.all, 'list'],
  list: filters => [...taskKeys.lists(), { filters }],
  details: () => [...taskKeys.all, 'detail'],
  detail: id => [...taskKeys.details(), id],
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
  const processedTasks =
    query.data?.map(task => ({
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
    mutationFn: async taskData => {
      const response = await api.createTask(taskData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
    onError: () => {
      // Handle error silently or show toast
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
    onError: () => {
      // Handle error silently or show toast
    },
  });
};

// Hook for deleting tasks
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async id => {
      const response = await api.deleteTask(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
    onError: () => {
      // Handle error silently or show toast
    },
  });
};

// Hook for toggling task completion
export const useToggleTaskCompletion = () => {
  const queryClient = useQueryClient();

  return {
    toggleCompletion: async task => {
      const updatedTask = {
        ...task,
        isCompleted: !task.isCompleted,
      };

      try {
        await api.updateTask(task.id, { isCompleted: updatedTask.isCompleted });
        queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      } catch {
        // Handle error silently or show toast
      }
    },
  };
};
