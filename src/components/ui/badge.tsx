import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-all',
  {
    variants: {
      variant: {
        wilaya: 'bg-red-500/20 text-red-400 border border-red-500/30',
        qada: 'bg-teal-500/20 text-teal-400 border border-teal-500/30',
        baladiya: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
        belde: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      },
    },
    defaultVariants: { variant: 'wilaya' },
  }
);

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };