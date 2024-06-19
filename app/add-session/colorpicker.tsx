import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getContrastingTextColor } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';
import { SketchPicker } from 'react-color';
import { UseFormSetValue } from 'react-hook-form';

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
          onChange={({ hex }) => onColorChange(hex)}
        />
      </PopoverContent>
    </Popover>
  );
}
