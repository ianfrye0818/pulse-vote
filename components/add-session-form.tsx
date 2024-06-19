'use client';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { z } from 'zod';
import { addSession } from '@/firebase/firestore'; // Assuming this is your Firestore function
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ColorPicker } from '@/app/add-session/colorpicker';

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

export default function AddSessionForm() {
  const router = useRouter();
  const [allowMultiple, setAllowMultiple] = useState(true);
  // const [color, setColor] = useState('#0FDFD3');
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
      title: '',
      choices: [{ value: '', votes: 0, color: '#0FDFD3' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'choices',
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    try {
      await addSession(data.choices, allowMultiple, data.title);
      reset();

      router.push('/get-session');
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation failed:', error.errors);
        // Handle validation errors as needed
      } else if (error instanceof Error) {
        console.error('Submission error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  const addChoice = () => {
    append({ value: '', votes: 0, color: '#0FDFD3' }); // Include default color
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Graph Choices</CardTitle>
        <CardDescription>
          Configure the choices for your graph. You can add multiple choices and allow users to
          select multiple options.
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
          <Button type='submit'>Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M18 6 6 18' />
      <path d='m6 6 12 12' />
    </svg>
  );
}
