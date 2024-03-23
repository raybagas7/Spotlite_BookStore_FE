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
import services from '@/utils/service';
import { setCookie } from 'cookies-next';
import { toast } from 'sonner';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [showPasswod, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const onToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const loginFormSchema = z.object({
    email: z.string().email({ message: 'Must be a valid email' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
  });

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const res = await services.postLogin(values);
    if (res.error) {
      console.log(res.message);
      toast.warning(res.message);
    } else {
      console.log(res.data?.token);
      setCookie('token', res.data?.token);
      toast.success(res.message);
      router.push('/');
    }
  }

  return (
    <div className="shadow-drop-line mt-5 w-[80vw] rounded-lg border-[1px] border-border bg-background p-5 lg:mt-0 lg:w-[30rem]">
      <div className="space-y-3 lg:space-y-5">
        <p className="text-center text-2xl font-bold text-primary">SpotBook</p>
        <div className="flex flex-col justify-center gap-1 text-center text-xs lg:flex-row lg:text-base">
          <p className="hidden lg:block">{`If you don't have an account`}</p>
          <Link
            href={'/signup'}
            className="text-primary font-bold transition-transform hover:underline hover:transition-transform"
          >
            Signup Here
          </Link>
        </div>
        <HeaderLined className="text-sm lg:text-base">LogIn</HeaderLined>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
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
              <Button className="w-full lg:w-fit">LogIn</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
