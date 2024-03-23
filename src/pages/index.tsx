import { ReactElement, useEffect, useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { fetchBooks } from '@/actions/fetch-books';
import LoadMore from '@/components/LoadMore';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    const getBook = async () => {
      const books = await fetchBooks(1, 9);

      if (books) {
        setBooks(books);
      }
    };

    getBook();
  }, []);

  if (!books) {
    return null;
  }
  return (
    <main className="container mx-auto p-4 min-h-screen max-w-5xl">
      <h1 className="text-center my-4 text-5xl font-bold">BOOK ON SALE</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <LoadMore books={books} setBooks={setBooks} />
      </div>
    </main>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
