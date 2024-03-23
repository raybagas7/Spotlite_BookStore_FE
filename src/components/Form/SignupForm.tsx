import * as z from 'zod';
import Link from 'next/link';
import React, { useState } from 'react';
import HeaderLined from '../HeaderLined';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { InputPrime } from '../ui/input-prime';
import { Button } from '../ui/button';

const SignupForm = () => {
  const [showPasswod, setShowPassword] = useState<boolean>(false);
  const onToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const signupFormSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: 'Fullname must be at least 2 characters.',
      })
      .refine((value) => /^[a-zA-Z ]+$/.test(value), {
        message: 'Fullname can only contain letters',
      }),
    email: z.string().email({ message: 'Must be a valid email' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
  });

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    console.log(values);
  }
  return (
    <div className="shadow-drop-line mt-5 w-[80vw] rounded-lg border-[1px] border-border bg-background p-5 lg:mt-0 lg:w-[30rem]">
      <div className="space-y-3 lg:space-y-5">
        <p className="text-center text-2xl font-bold text-primary">SpotBook</p>
        <div className="flex flex-col justify-center gap-1 text-center text-xs lg:flex-row lg:text-base">
          <p className="hidden lg:block">{`If you already have an account,`}</p>
          <Link
            href={'/login'}
            className="text-primary font-bold transition-transform hover:underline hover:transition-transform"
          >
            Login Here
          </Link>
        </div>
        <HeaderLined className="text-sm lg:text-base">SignUp</HeaderLined>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-base">
                    Name
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-base">
                    Email
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-base">
                    Password
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputPrime
                      icon={
                        showPasswod ? (
                          <FaRegEye
                            className=" cursor-pointer dark:text-primary-foreground"
                            onClick={onToggleShowPassword}
                          />
                        ) : (
                          <FaRegEyeSlash
                            className=" cursor-pointer dark:text-primary-foreground"
                            onClick={onToggleShowPassword}
                          />
                        )
                      }
                      iconEnd
                      type={showPasswod ? 'text' : 'password'}
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-center pt-5 ">
              <Button className="w-full lg:w-fit">SignUp</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupForm;
