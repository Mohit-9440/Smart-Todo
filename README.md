# Smart Todo App

A modern, feature-rich todo application built with React, featuring a clean architecture, professional UI, and comprehensive task management capabilities.

## 🚀 Features

### Core Functionality
- **Task Management**: Create, edit, delete, and toggle task completion
- **Smart Categorization**: Tasks are automatically organized into Active, Completed, and Overdue buckets
- **Real-time Status Updates**: Tasks automatically move between buckets based on deadlines
- **Deadline Tracking**: Visual indicators for task urgency and overdue status

### User Experience
- **Light/Dark Mode**: Toggle between themes with smooth transitions
- **Responsive Design**: Optimized for desktop and mobile devices
- **Toast Notifications**: User-friendly feedback for all actions
- **Modal Interface**: Clean task creation with form validation
- **Professional UI**: Modern design with consistent styling

### Technical Features
- **State Management**: React Query for efficient data fetching and caching
- **Form Validation**: Zod schema validation with real-time feedback
- **Error Handling**: Comprehensive error states and user feedback
- **Performance**: Optimized rendering and smooth animations

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Custom components with shadcn/ui patterns
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── TaskCard.jsx        # Individual task display
│   ├── TaskBucket.jsx      # Task category containers
│   ├── TaskModal.jsx       # Task creation modal
│   ├── TaskForm.jsx        # Task editing form
│   └── ThemeToggle.jsx     # Theme switcher
├── contexts/
│   └── ThemeContext.jsx    # Theme state management
├── hooks/
│   └── useTasks.js         # Custom hooks for task operations
├── services/
│   └── api.js              # Mock API service
├── utils/
│   ├── taskUtils.js        # Task utility functions
│   ├── toastUtils.jsx      # Toast notification utilities
│   └── cn.js              # Class name utility
└── App.jsx                 # Main application component
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for active elements
- **Success**: Green for completed tasks
- **Warning**: Yellow for urgent tasks
- **Error**: Red for overdue tasks and errors
- **Neutral**: Gray scale for backgrounds and text

### Typography
- **Font**: Inter (system fallback)
- **Hierarchy**: Clear heading and text sizing
- **Accessibility**: Proper contrast ratios

### Components
- **Cards**: Consistent styling with hover effects
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Forms**: Validated inputs with error states
- **Modals**: Clean overlay dialogs

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## 📱 Usage

### Creating Tasks
1. Click "Add New Task" button (top-right)
2. Fill in title, description, and deadline
3. Submit to create the task

### Managing Tasks
- **Edit**: Click the edit icon on any task
- **Delete**: Click the trash icon (with confirmation)
- **Complete**: Click the checkbox to toggle completion
- **View Status**: Tasks are automatically categorized

### Theme Switching
- Click the sun/moon icon in the header
- Theme preference is saved automatically

## 🏗️ Architecture

### Component Design
- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: UI components are modular and reusable
- **Props Interface**: Clear prop definitions and validation

### State Management
- **React Query**: Handles server state and caching
- **Context API**: Manages theme state globally
- **Local State**: Component-specific state with useState

### Data Flow
1. **API Layer**: Mock service with realistic delays
2. **Hooks Layer**: Custom hooks for data operations
3. **Component Layer**: UI components with event handlers
4. **User Interface**: Clean, responsive design

## 🧪 Code Quality

### Best Practices
- **Type Safety**: PropTypes and Zod validation
- **Error Boundaries**: Comprehensive error handling
- **Performance**: Optimized re-renders and lazy loading
- **Accessibility**: ARIA labels and keyboard navigation

### Code Organization
- **Modular Structure**: Clear separation of concerns
- **Consistent Naming**: Descriptive variable and function names
- **Documentation**: Inline comments for complex logic
- **Testing Ready**: Components designed for testability

## 🚀 Performance Optimizations

- **React Query**: Efficient caching and background updates
- **Memoization**: Strategic use of React.memo and useMemo
- **Lazy Loading**: Code splitting for better initial load
- **Optimistic Updates**: Immediate UI feedback for better UX

## 📊 Features Overview

| Feature | Status | Description |
|---------|--------|-------------|
| Task CRUD | ✅ Complete | Full create, read, update, delete operations |
| Smart Categorization | ✅ Complete | Automatic task organization |
| Theme Switching | ✅ Complete | Light/dark mode with persistence |
| Form Validation | ✅ Complete | Real-time validation with Zod |
| Toast Notifications | ✅ Complete | User feedback for all actions |
| Responsive Design | ✅ Complete | Mobile and desktop optimized |
| Error Handling | ✅ Complete | Comprehensive error states |
| Performance | ✅ Complete | Optimized rendering and caching |

## 🎯 Future Enhancements

- **Backend Integration**: Real API endpoints
- **User Authentication**: Login and user management
- **Task Categories**: Custom task categories
- **Search & Filter**: Advanced task filtering
- **Data Export**: Export tasks to various formats
- **Offline Support**: Service worker for offline functionality

## 📄 License

This project is created for demonstration purposes as a frontend assignment.
