import * as z from 'zod';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/router';
import { InputPrime } from '../ui/input-prime';
import Tags from '../Tags';
import Image from 'next/image';
import services from '@/utils/service';
import { toast } from 'sonner';

const BookForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();

  const bookFormSchema = z.object({
    title: z
      .string()
      .min(2, { message: 'Title must be at least 2 characters long' }),
    point: z
      .string()
      .regex(/^[1-9]/, { message: 'First number must be not 0' }),
  });

  const updateTags = (tag_id: string) => {
    if (tags.includes(tag_id)) {
      setTags((prev) => prev.filter((tag) => tag !== tag_id));
    } else {
      setTags((prev) => [...prev, tag_id]);
    }
  };
  console.log(tags);

  const form = useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: '',
      point: '',
    },
  });

  async function onSubmit(values: z.infer<typeof bookFormSchema>) {
    console.log(values);

    if (tags.length > 0) {
      const payload: NewBookPayload = {
        title: values.title,
        cover:
          'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        point: parseInt(values.point),
        tags: tags,
      };
      const { error, message } = await services.postNewBook(payload);
      if (error) {
        toast.warning(message);
      } else {
        toast.success(message);
        router.push('/');
      }
    }
  }

  return (
    <div className="shadow-drop-line mt-5 w-[80vw] rounded-lg border-[1px] border-border bg-background p-5 lg:mt-0 lg:w-[30rem]">
      <div className="space-y-3 lg:space-y-5">
        <p className="text-center text-2xl font-bold text-primary">
          Post New Book
        </p>
        <div className="flex justify-center items-center relative">
          <div className="absolute text-center z-10 text-white text-xl rotate-45">
            <p>Templated</p>
            <p>Mock</p>
          </div>
          <Image
            width={150}
            height={150}
            src={
              'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg'
            }
            alt="template"
            className="object-contain h-48 brightness-[35%]"
          />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-base">
                    Title
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="point"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-base">
                    Point
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputPrime
                      icon="Pt"
                      onKeyDown={(evt) =>
                        ['e', 'E', '+', '-', '.'].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      type="number"
                      placeholder="point"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Tags updateTags={updateTags} />
            {tags.length === 0 && (
              <p className="text-xs font-bold">Choose at least 1 tag</p>
            )}
            <div className="flex w-full justify-center pt-5 ">
              <Button className="w-full lg:w-fit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BookForm;
