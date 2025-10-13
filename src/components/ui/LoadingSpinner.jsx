import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const LoadingSpinner = ({ 
  size = 'default', 
  className = '',
  text = 'Loading...',
  showText = false,
  variant = 'primary'
}) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    default: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  const variantClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    muted: 'text-muted-foreground'
  };

  return (
    <div 
      className={cn(
        'flex flex-col items-center justify-center gap-2',
        className
      )}
      role="status"
      aria-label={text}
    >
      <Loader2 
        className={cn(
          sizeClasses[size],
          variantClasses[variant],
          'animate-spin'
        )} 
      />
      {showText && (
        <span className="text-sm text-muted-foreground">{text}</span>
      )}
    </div>
  );
};

export default LoadingSpinner; 