import { useToast } from '@/components/ui/use-toast';

interface successToastProps {
  message: string;
  title?: string;
  duration?: number;
}

export default function useSuccessToast() {
  const { toast } = useToast();

  const successToast = ({ message, title, duration }: successToastProps) => {
    toast({
      title: title || 'Success!',
      description: message,
      variant: 'success',
      duration,
    });
  };

  return { successToast };
}
