import { useToast } from '@/components/ui/use-toast';
import { capitalizeFirstLetter } from '@/lib/utils';

interface ErrorToastProps {
  message: string;
  title?: string;
  duration?: number;
  error?: unknown;
}

export default function useErrorToast() {
  const { toast } = useToast();

  const errorToast = ({ message, title, duration, error }: ErrorToastProps) => {
    toast({
      title: title ? capitalizeFirstLetter(title) : 'Error',
      description: capitalizeFirstLetter(message),
      variant: 'destructive',
      duration: duration || 5000,
    });
  };

  return { errorToast };
}
