'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import useErrorToast from '@/hooks/useErrorToast';

const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export default function SignInForm() {
  const { errorToast } = useErrorToast();
  const form = useForm({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const rootErrors = form.formState.errors.root?.message;

  async function onSubmit(data: z.infer<typeof SignInFormSchema>) {
    try {
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        return errorToast({
          message: error.errors[0].message,
        });
      }
      if (error instanceof Error) {
        return errorToast({
          message: error.message,
        });
      } else {
        errorToast({
          message: 'Failed to sign in',
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      placeholder='Email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      placeholder='Password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      placeholder='Confirm Password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type='submit'
            className='w-full'
          >
            Sign In
          </Button>
          {rootErrors && <div className='text-red-500 text-sm text-center'>{rootErrors}</div>}
        </div>
        <Separator className='my-8' />
        <div className='space-y-4'>
          <Button
            variant='outline'
            className='w-full flex gap-2 items-center justify-center'
          >
            <FaGoogle />
            Sign in with Google
          </Button>
          <Button
            variant='default'
            className='w-full flex gap-2 items-center justify-center'
          >
            <FaGithub /> Sign in with GitHub
          </Button>
          <div className='text-center text-sm text-muted-foreground'>
            {"Don't have an account?"}{' '}
            <Link
              href='/sign-in'
              className='underline'
              prefetch={false}
            >
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
