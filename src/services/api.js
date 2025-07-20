import axios from 'axios';

// Mock data for development
const mockTasks = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the Smart Todo app',
    deadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Review code changes',
    description: 'Review pull requests and provide feedback',
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Setup development environment',
    description: 'Install and configure all necessary tools',
    deadline: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    isCompleted: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Fix critical bug',
    description: 'Address the authentication issue in production',
    deadline: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class TaskAPI {
  constructor() {
    this.tasks = [...mockTasks];
    this.baseURL = '/api';
  }

  async getTasks() {
    await delay(500); // Simulate network delay
    return { data: [...this.tasks] };
  }

  async createTask(taskData) {
    await delay(300);
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    return { data: newTask };
  }

  async updateTask(id, taskData) {
    await delay(300);
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...taskData,
      updatedAt: new Date().toISOString(),
    };
    
    return { data: this.tasks[taskIndex] };
  }

  async deleteTask(id) {
    await delay(300);
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    const deletedTask = this.tasks[taskIndex];
    this.tasks.splice(taskIndex, 1);
    return { data: deletedTask };
  }
}

// Create API instance
const api = new TaskAPI();

export default api; 