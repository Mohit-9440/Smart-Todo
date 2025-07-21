import { useState, useRef } from 'react';
import { Plus, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from './ui/dialog';

const TaskModal = ({ onSubmit, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
  });
  const [errors, setErrors] = useState({});
  const dateInputRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData.title.trim() && formData.deadline) {
      onSubmit({
        ...formData,
        createdAt: new Date().toISOString(),
        isCompleted: false,
      });
      setFormData({ title: '', description: '', deadline: '' });
      setErrors({});
      setIsOpen(false);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className='add-task-btn flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200'
        >
          <Plus className='w-4 h-4' />
          Add New Task
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold text-foreground'>
            Add New Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Title Field */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-foreground'>
              Title *
            </label>
            <div className='relative'>
              <Input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                className={`pr-10 ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder='Enter task title...'
                required
              />
              {formData.title.trim() && (
                <CheckCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500' />
              )}
            </div>
            {errors.title && (
              <div className='flex items-center gap-1 text-red-500 text-sm'>
                <AlertCircle className='w-4 h-4' />
                {errors.title}
              </div>
            )}
          </div>

          {/* Description Field */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-foreground'>
              Description
            </label>
            <Textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Enter task description...'
              rows='3'
            />
          </div>

          {/* Deadline Field */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-foreground'>
              Deadline *
            </label>
            <div className='relative'>
              <Input
                ref={dateInputRef}
                type='datetime-local'
                name='deadline'
                value={formData.deadline}
                onChange={handleChange}
                className={`pr-10 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden ${errors.deadline ? 'border-red-500 focus:ring-red-500' : ''}`}
                required
              />
              <button
                type='button'
                onClick={openDatePicker}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors'
              >
                <Calendar className='w-4 h-4 text-muted-foreground' />
              </button>
            </div>
            {errors.deadline && (
              <div className='flex items-center gap-1 text-red-500 text-sm'>
                <AlertCircle className='w-4 h-4' />
                {errors.deadline}
              </div>
            )}
          </div>
        </form>

        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => setIsOpen(false)}
            className='theme-toggle'
          >
            Cancel
          </Button>
          <Button
            type='submit'
            disabled={isLoading || !formData.title.trim() || !formData.deadline}
            onClick={handleSubmit}
            className='add-task-btn'
          >
            {isLoading ? 'Adding...' : 'Add Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
