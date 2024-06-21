import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getContrastingTextColor } from '@/lib/utils';
import { SketchPicker } from 'react-color';

interface ColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
}

export function ColorPicker({ color, onColorChange }: ColorPickerProps) {
  const textColor = getContrastingTextColor(color);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          style={{ backgroundColor: color, color: textColor }}
        >
          Pick Color
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-min'>
        <SketchPicker
          color={color}
          onChange={({ hex }) => onColorChange(hex.toUpperCase())}
        />
      </PopoverContent>
    </Popover>
  );
}
