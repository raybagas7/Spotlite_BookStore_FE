'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from './ui/card';
import Image from 'next/image';

export interface BookProps {
  books: Book[] | null;
}

const Books = ({ books }: BookProps) => {
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
              <CardDescription>{book.point}</CardDescription>
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
