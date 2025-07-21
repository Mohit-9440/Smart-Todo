# Smart Todo App

A modern, feature-rich todo application built with React that demonstrates professional frontend development practices with real-world backend integration.

## 🎯 Project Overview

This Smart Todo App showcases advanced frontend development skills with a focus on:
- **Clean Architecture**: Modular component design with separation of concerns
- **Real-world Backend Integration**: Support for both Mock API and Supabase (PostgreSQL)
- **Professional UI/UX**: Modern design with responsive layout and accessibility
- **Production-ready Features**: Error handling, performance optimization, and data persistence

## 🛠️ Technical Choices

### Frontend Stack
- **React 19** - Latest React with modern hooks and features
- **Vite** - Fast build tool for optimal development experience
- **Tailwind CSS** - Utility-first CSS for rapid UI development
- **TanStack Query** - Powerful data fetching and caching
- **React Hook Form + Zod** - Type-safe form validation
- **Lucide React** - Beautiful, customizable icons

### Backend Options
- **Mock API** - Local storage-based API for development/demos
- **Supabase** - Real PostgreSQL database with real-time capabilities
- **API Factory Pattern** - Smart switching between backends

### Key Technical Decisions
- **Component Architecture**: Reusable UI components with shadcn/ui patterns
- **State Management**: React Query for server state, Context for theme
- **Form Validation**: Zod schemas for runtime type safety
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Performance**: Optimized rendering with React Query caching

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Mohit-9440/Smart-Todo.git
cd Smart

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run on `http://localhost:5173` (or next available port).

### Backend Configuration

#### Option A: Mock API (Default)
No setup required! The app uses localStorage for data persistence.

#### Option B: Supabase (Recommended)
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create a `.env` file in the project root:
```env
VITE_USE_SUPABASE=true
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```
3. Run the SQL setup from [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

## 🎨 Innovative Features

### 1. Smart Task Categorization
Tasks are automatically organized into three intelligent buckets:
- **Active Tasks**: Ongoing tasks with future deadlines
- **Completed Tasks**: Successfully finished tasks
- **Overdue Tasks**: Missed deadlines with visual urgency indicators

### 2. Real-time Status Updates
- Tasks automatically move between buckets based on deadlines
- Visual urgency indicators (color-coded borders)
- Countdown timers for approaching deadlines
- Overdue warnings with prominent styling

### 3. Dual Backend Architecture
- **Seamless switching** between Mock API and Supabase
- **Environment-based configuration** - no code changes needed
- **Production-ready** with real database integration
- **Fallback support** for development and testing

### 4. Professional UX Patterns
- **Toast notifications** for all user actions
- **Confirmation dialogs** for destructive operations
- **Loading states** with skeleton animations
- **Error boundaries** with graceful fallbacks
- **Theme persistence** across sessions

### 5. Performance Optimizations
- **React Query caching** for efficient data fetching
- **Optimistic updates** for immediate UI feedback
- **Code splitting** for faster initial loads
- **Memoization** for expensive calculations

## 📁 Project Structure

```
src/
├── components/          # UI components
│   ├── ui/             # Reusable UI primitives
│   ├── TaskCard.jsx    # Individual task display
│   ├── TaskBucket.jsx  # Task categorization
│   └── TaskModal.jsx   # Task creation/editing
├── hooks/              # Custom React hooks
│   └── useTasks.js     # Data fetching logic
├── services/           # API layer
│   ├── api.js          # Mock API
│   ├── supabaseApi.js  # Supabase integration
│   └── apiFactory.js   # Backend switching
├── utils/              # Utility functions
└── contexts/           # Global state
```

## 🔌 API Contract

The app follows a strict API contract supporting both backends:

```json
{
  "id": "uuid",
  "title": "string", 
  "description": "string",
  "deadline": "ISO timestamp",
  "isCompleted": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Endpoints**: `GET /tasks`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`

## 🎯 Key Features

| Feature | Status | Description |
|---------|--------|-------------|
| Task CRUD | ✅ Complete | Full create, read, update, delete |
| Smart Categorization | ✅ Complete | Automatic task organization |
| Real-time Updates | ✅ Complete | Live status changes |
| Dual Backend | ✅ Complete | Mock API + Supabase |
| Responsive Design | ✅ Complete | Mobile + desktop |
| Theme Switching | ✅ Complete | Light/dark mode |
| Form Validation | ✅ Complete | Zod schema validation |
| Error Handling | ✅ Complete | Comprehensive error states |

## 🚀 Running the Project

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Testing
```bash
npm run test
```

## 📱 Usage

1. **Create Tasks**: Click "Add New Task" → Fill form → Submit
2. **Edit Tasks**: Click edit icon → Modify details → Save
3. **Complete Tasks**: Click checkbox to toggle completion
4. **Delete Tasks**: Click trash icon → Confirm deletion
5. **Switch Themes**: Click sun/moon icon in header

Tasks automatically organize into Active, Completed, and Overdue buckets based on deadlines and completion status.

## 🏆 Why This Project Stands Out

- **Real-world Integration**: Actual database with Supabase
- **Professional Architecture**: Clean, scalable code structure
- **Production-ready**: Error handling, performance, accessibility
- **Modern Stack**: Latest React, Vite, and development tools
- **Dual Backend**: Flexibility for different deployment scenarios
- **Smart UX**: Intelligent task categorization and real-time updates

This project demonstrates advanced frontend development skills with practical, real-world implementation patterns.
