import { cn } from '@/lib/utils';
import * as React from 'react';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300', className)} {...props} />
  )
);
Card.displayName = 'Card';

export { Card };