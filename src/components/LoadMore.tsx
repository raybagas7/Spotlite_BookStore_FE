'use client';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Spinner from './ui/spinner';
import { fetchBooks } from '@/actions/fetch-books';
import Books from './Books';
import { delay } from '@/lib/utils';
import { useUser } from '@/store/useUser';

interface ILoadMore {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const LoadMore = ({ books, setBooks }: ILoadMore) => {
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [keepLoad, setKeepload] = useState(true);
  const [preventLoad, setPreventLoad] = useState(false);
  const { userData } = useUser();

  const { ref, inView } = useInView();

  useEffect(() => {
    const loadMoreBooks = async () => {
      await delay(2000);
      const nextPage = pagesLoaded + 1;
      const newBooks = (await fetchBooks(nextPage, 9)) ?? [];

      setBooks((prev: Book[]) => [...prev, ...newBooks]);
      setPagesLoaded(nextPage);
      if (newBooks.length === 0) {
        setKeepload(false);
      }
      setPreventLoad(false);
    };
    if (inView) {
      if (!preventLoad) {
        setPreventLoad(true);
        loadMoreBooks();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <>
      <Books books={books} userData={userData} />
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        {keepLoad && <Spinner />}
      </div>
    </>
  );
};

export default LoadMore;
