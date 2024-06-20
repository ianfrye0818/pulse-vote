import { useToast } from '@/components/ui/use-toast';

interface ErrorToastProps {
  message: string;
  title?: string;
  duration?: number;
}

export default function useErrorToast() {
  const { toast } = useToast();

  const errorToast = ({ message, title, duration }: ErrorToastProps) => {
    toast({
      title: title || 'E R R O R',
      description: message,
      variant: 'destructive',
      duration,
    });
  };

  return { errorToast };
}
