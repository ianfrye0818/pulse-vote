// components/Option.tsx
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface OptionProps {
  id: string;
  title: string;
  allowMultiple: boolean;
  checked: boolean;
  onChange: () => void;
}

const SelectOption = ({ id, title, allowMultiple, checked, onChange }: OptionProps) => {
  return (
    <div className='flex items-center gap-3'>
      <Checkbox
        name='options'
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        disabled={!allowMultiple && checked}
      />
      <Label
        htmlFor={id}
        className='text-base font-medium'
      >
        {title}
      </Label>
    </div>
  );
};

export default SelectOption;
