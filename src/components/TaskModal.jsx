import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
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

const TaskModal = ({ onSubmit, isLoading = false }) => {
  const [open, setOpen] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
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
      reset();
      setOpen(false);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 border border-border">
          <Plus className="w-4 h-4" />
          Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Add a new task with title, description, and deadline.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              {...register('title')}
              type="text"
              id="title"
              placeholder="Enter task title"
              className={errors.title ? 'border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              {...register('description')}
              id="description"
              placeholder="Enter task description"
              className={errors.description ? 'border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
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
                className={`pr-10 ${errors.deadline || isPastDeadline ? 'border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400' : ''}`}
              />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            {errors.deadline && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.deadline.message}</p>
            )}
            {isPastDeadline && !errors.deadline && (
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                ⚠️ This deadline is in the past
              </p>
            )}
          </div>

          {/* Form Actions */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </div>
              ) : (
                'Create Task'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal; 