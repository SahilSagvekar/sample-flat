import { toast as sonnerToast } from 'sonner';

export function useToast() {
  return {
    toast: ({
      title,
      description,
      variant = 'default',
    }: {
      title: string;
      description?: string;
      variant?: 'default' | 'destructive' | 'success';
    }) => {
      sonnerToast[variant === 'destructive' ? 'error' : 'message'](title, {
        description,
      });
    },
  };
}
