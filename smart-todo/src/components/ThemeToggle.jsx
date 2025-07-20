import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <Sun className={`h-5 w-5 transition-all duration-300 ${
        isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
      }`} />
      <Moon className={`absolute h-5 w-5 transition-all duration-300 ${
        isDark ? '-rotate-90 scale-0' : 'rotate-0 scale-100'
      }`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle; 