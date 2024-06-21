import { useToast } from '@/components/ui/use-toast';
import { capitalizeFirstLetter } from '@/lib/utils';

interface successToastProps {
  message: string;
  title?: string;
  duration?: number;
}

export default function useSuccessToast() {
  const { toast } = useToast();

  const successToast = ({ message, title, duration }: successToastProps) => {
    toast({
      title: title ? capitalizeFirstLetter(title) : 'Success!',
      description: capitalizeFirstLetter(message),
      variant: 'success',
      duration,
    });
  };

  return { successToast };
}
