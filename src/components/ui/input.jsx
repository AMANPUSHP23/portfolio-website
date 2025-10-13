
import React from 'react';
import { cn } from '@/lib/utils';

// Enhanced Input component with accessibility best practices
const Input = React.forwardRef(({ className, type = 'text', role, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        'transition-all duration-300 ease-in-out focus:border-primary focus:shadow-[0_0_0_2px_hsl(var(--primary)_/_0.3)]',
        className
      )}
      ref={ref}
      role={role}
      {...props} // allow aria-* and other accessibility props
    />
  );
});
Input.displayName = 'Input';

// Enhanced Textarea component with accessibility best practices
const Textarea = React.forwardRef(({ className, role, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        'transition-all duration-300 ease-in-out focus:border-primary focus:shadow-[0_0_0_2px_hsl(var(--primary)_/_0.3)]',
        className
      )}
      ref={ref}
      role={role}
      {...props} // allow aria-* and other accessibility props
    />
  );
});
Textarea.displayName = 'Textarea';


export { Input, Textarea };
