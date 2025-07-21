import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from './ui/button';

const SearchComponent = ({ tasks, onSearchChange, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const trimmed = value.trim();
    setSearchTerm(value);

    if (!trimmed) {
      onSearchChange(tasks);
      return;
    }

    const searchLower = trimmed.toLowerCase();
    const filteredTasks = tasks.filter(task => {
      const title = task.title?.toLowerCase() || '';
      const description = task.description?.toLowerCase() || '';
      return title.includes(searchLower) || description.includes(searchLower);
    });

    onSearchChange(filteredTasks);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearchChange(tasks);
  };

  const getSearchStats = () => {
    if (!searchTerm.trim()) return null;
    
    const searchLower = searchTerm.toLowerCase();
    const filteredTasks = tasks.filter(task => {
      const title = task.title?.toLowerCase() || '';
      const description = task.description?.toLowerCase() || '';
      return title.includes(searchLower) || description.includes(searchLower);
    });
    
    const total = tasks.length;
    const found = filteredTasks.length;
    
    return { total, found };
  };

  const stats = getSearchStats();

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input w-full pl-12 pr-12 py-2 text- shadow-lg rounded-xl border-2 focus:border-blue-500 transition-all duration-200"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Statistics */}
        {stats && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Found {stats.found} of {stats.total} tasks
            {stats.found > 0 && (
              <span className="ml-2 text-green-600 dark:text-green-400">
                ✓ Results found
              </span>
            )}
          </div>
        )}
      </div>

      {/* No Results Message */}
      {searchTerm && stats && stats.found === 0 && (
        <div className="text-center py-8">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
            No tasks found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try searching with different keywords
          </p>
          <Button
            onClick={clearSearch}
            variant="outline"
            className="theme-toggle"
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchComponent; 