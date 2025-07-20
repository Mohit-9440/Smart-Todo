import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Clock, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

// Form validation schema
const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  deadline: z.string().min(1, 'Deadline is required'),
});

const TaskForm = ({ task = null, onSubmit, onCancel, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: task ? {
      title: task.title,
      description: task.description || '',
      deadline: new Date(task.deadline).toISOString().slice(0, 16),
    } : {
      title: '',
      description: '',
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // Default to tomorrow
    },
    mode: 'onChange',
  });

  const watchedDeadline = watch('deadline');
  const deadlineDate = watchedDeadline ? new Date(watchedDeadline) : null;
  const isPastDeadline = deadlineDate && deadlineDate < new Date();

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      if (!task) {
        reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {task ? 'Edit Task' : 'Create New Task'}
        </h3>
        <button
          onClick={handleCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Title Field */}
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            {...register('title')}
            type="text"
            id="title"
            placeholder="Enter task title"
            className={errors.title ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            {...register('description')}
            id="description"
            placeholder="Enter task description"
            className={errors.description ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        {/* Deadline Field */}
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline *</Label>
          <div className="relative">
            <Input
              {...register('deadline')}
              type="datetime-local"
              id="deadline"
              className={`pr-10 ${errors.deadline || isPastDeadline ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
            <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          {errors.deadline && (
            <p className="text-sm text-red-600">{errors.deadline.message}</p>
          )}
          {isPastDeadline && !errors.deadline && (
            <p className="text-sm text-yellow-600">
              ⚠️ This deadline is in the past
            </p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {task ? 'Update Task' : 'Create Task'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm; 