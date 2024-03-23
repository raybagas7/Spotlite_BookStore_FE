'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from './ui/card';
import Image from 'next/image';
import ButtonWithLoading from './ui/button-loading';
import { useLoading } from '@/store/useLoading';
import services from '@/utils/service';
import { toast } from 'sonner';
import { useUser } from '@/store/useUser';
import { delay } from '@/lib/utils';

export interface BookProps {
  books: Book[] | null;
  userData: IUserData | undefined;
}

const Books = ({ books, userData }: BookProps) => {
  const { showButtonLoading, hideButtonLoading } = useLoading();
  const { getUserData } = useUser();
  const [ordered, setOrdered] = useState('');

  const onOrderBook = async (
    book_id: string,
    writer_id: string,
    point: number,
    title: string
  ) => {
    showButtonLoading();
    setOrdered(book_id);
    const { error, data, message } = await services.postOrderBook({
      book_id,
      writer_id,
      point,
    });

    await delay(1000);

    if (error) {
      toast.error(message);
      hideButtonLoading();
    }

    if (!error) {
      toast.success(`${message} for ${title}`);
      getUserData();
    }
    hideButtonLoading();
  };

  return (
    <>
      {books ? (
        books?.map((book) => (
          <Card key={book.book_id}>
            <CardContent className="flex flex-col items-center justify-center p-4">
              <Image
                width={500}
                height={500}
                src={book.cover}
                alt={book.title}
                className="object-contain h-48"
              />
            </CardContent>
            <CardFooter className="text-center flex flex-col p-4">
              <CardTitle className="my-2">{book.title}</CardTitle>
              <CardDescription>Point: {book.point}</CardDescription>
              {userData && (
                <div className="w-full rounded-b-xl mt-2">
                  <ButtonWithLoading
                    onClick={() =>
                      onOrderBook(
                        book.book_id,
                        book.writer_id,
                        book.point,
                        book.title
                      )
                    }
                    loadingContent={book.book_id === ordered && 'Ordering'}
                    disabledContent="Insufficient point"
                    disabled={userData?.point < book.point}
                    buttonContent="Buy with point"
                  ></ButtonWithLoading>
                </div>
              )}
            </CardFooter>
          </Card>
        ))
      ) : (
        <div>No books</div>
      )}
    </>
  );
};

export default Books;
