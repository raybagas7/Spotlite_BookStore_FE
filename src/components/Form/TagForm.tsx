import * as z from 'zod';
import React from 'react';
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
import LabeledContainer from '../LabeledContainer';
import { toast } from 'sonner';
import services from '@/utils/service';
import { useTag } from '@/store/useTag';

const TagForm = () => {
  const { getTags } = useTag();
  const tagFormSchema = z.object({
    name: z
      .string()
      .min(2, { message: 'Tag name must be at least 2 characters long' }),
  });

  const form = useForm<z.infer<typeof tagFormSchema>>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof tagFormSchema>) {
    console.log(values);
    const { error, message } = await services.postNewTag(values);
    if (error) {
      toast.warning(message);
    } else {
      getTags();
      toast.success(`${values.name} tag has been added`);
    }
  }

  return (
    <div className="">
      <LabeledContainer label="Add new Tag" className="mt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-base">
                    Tag Name
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Press Enter to Submit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </LabeledContainer>
    </div>
  );
};

export default TagForm;
