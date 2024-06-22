'use client';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { updateRoom } from '@/firebase/firestore'; // Assuming this is your Firestore function
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useErrorToast from '@/hooks/useErrorToast';
import useSuccessToast from '@/hooks/useSuccessToast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ColorPicker } from './colorpicker';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { roomData } from '@/types';
import CustomAlertDialog from '@/components/alert-dialog';
import { XIcon } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  choices: z.array(
    z.object({
      value: z.string().min(1, { message: 'Choice value is required' }),
      votes: z.number().int(),
      color: z.string().min(1, { message: 'Color is required' }),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditRoomForm({ room }: { room: roomData }) {
  const router = useRouter();
  const { successToast } = useSuccessToast();
  const { errorToast } = useErrorToast();
  const [allowMultiple, setAllowMultiple] = useState(room.data.allowMultiple);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: room.data.title,
      choices: room.data.roomChoices,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'choices',
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      await updateRoom(room.docId, {
        ...data,
        allowMultiple,
        totalVotes: room.data.totalVotes,
      });
      reset();
      successToast({
        message: 'Room updated successfully',
      });
      router.push('/get-rooms');
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation failed:', error.errors);
        errorToast({
          message: 'Please check your inputs',
        });
      } else if (error instanceof Error) {
        console.error('Error:', error);
        errorToast({
          message: 'An error occurred while creating the room',
        });
      } else {
        console.error('Unknown error:', error);
        errorToast({
          message: 'An unknown error occurred',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const addChoice = () => {
    append({ value: '', votes: 0, color: '#D0021B' }); // Include default color
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Graph Choices</CardTitle>
        <CardDescription>
          Make any edits to your graph choices here and they will be reflected instantly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <Input
            {...register('title', { required: true })}
            type='text'
            placeholder='Title'
          />
          {errors.title && <p className='italic text-red-500 text-sm'>Title is required</p>}
          <Separator className='my-[25px]' />
          {fields.map((choice, index) => (
            <div
              key={choice.id}
              className='flex items-center gap-2'
            >
              <Input
                {...register(`choices.${index}.value`, { required: true })}
                type='text'
                placeholder={`Choice ${index + 1}`}
              />

              {index > 0 && (
                <Button
                  type='button'
                  variant='ghost'
                  onClick={() => remove(index)}
                >
                  <XIcon className='h-4 w-4' />
                </Button>
              )}
              <ColorPicker
                color={watch(`choices.${index}.color`)}
                onColorChange={(newColor) => setValue(`choices.${index}.color`, newColor)}
              />
            </div>
          ))}
          {errors.choices && (
            <p className='italic text-red-500 text-sm'>Choice value is required</p>
          )}
          <Button
            type='button'
            onClick={addChoice}
          >
            Add Choice
          </Button>
          <div className='flex items-center gap-2'>
            <Checkbox
              checked={allowMultiple}
              onCheckedChange={() => setAllowMultiple(!allowMultiple)}
              name='allow-multiple'
              id='allow-multiple'
            />
            <Label htmlFor='allow-multiple'>Allow Multiple Choices</Label>
          </div>
          <CustomAlertDialog
            submitting={isSubmitting}
            title='Modify Room'
            description='Are you sure you want to modify this room?'
            onConfirm={handleSubmit(onSubmit)}
            trigger='Update'
            className='bg-black text-white min-w-[100px]'
          />
        </form>
      </CardContent>
    </Card>
  );
}
