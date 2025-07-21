// fallback to mock data if supabase is not used
// Generate UUID for task IDs
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Mock data for development
const mockTasks = [
  {
    id: generateUUID(),
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the Smart Todo app',
    deadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateUUID(),
    title: 'Review code changes',
    description: 'Review pull requests and provide feedback',
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateUUID(),
    title: 'Setup development environment',
    description: 'Install and configure all necessary tools',
    deadline: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    isCompleted: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateUUID(),
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
    // Try to load tasks from localStorage, fallback to mock data
    const savedTasks = localStorage.getItem('smart-todo-tasks');
    this.tasks = savedTasks ? JSON.parse(savedTasks) : [...mockTasks];
    this.baseURL = '/api';
  }

  // Save tasks to localStorage
  saveTasks() {
    localStorage.setItem('smart-todo-tasks', JSON.stringify(this.tasks));
  }

  // Retrieve a list of all tasks
  async getTasks() {
    await delay(500); // Simulate network delay
    return { data: [...this.tasks] };
  }

  // Create a new task
  async createTask(taskData) {
    await delay(300);
    const newTask = {
      id: generateUUID(),
      title: taskData.title,
      description: taskData.description || '',
      deadline: taskData.deadline,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    this.saveTasks(); // Save to localStorage
    return { data: newTask };
  }

  // Update a task
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
    
    this.saveTasks(); // Save to localStorage
    return { data: this.tasks[taskIndex] };
  }

  // Delete a task
  async deleteTask(id) {
    await delay(300);
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    const deletedTask = this.tasks[taskIndex];
    this.tasks.splice(taskIndex, 1);
    this.saveTasks(); // Save to localStorage
    return { data: deletedTask };
  }
}

const api = new TaskAPI();

export default api; 