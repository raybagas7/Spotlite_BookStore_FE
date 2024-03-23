interface Tag {
  tag_id: string;
  name: string;
}

interface Book {
  book_id: string;
  title: string;
  cover: string;
  point: number;
  writer_id: string;
  createdAt: string;
  updatedAt: string;
  bookTags: Tag[];
}

interface BookOrder {
  book_id: string;
  title: string;
  cover: string;
}

interface WriterOrder {
  id: string;
  name: string;
  email: string;
}

interface Order {
  order_id: string;
  book_id: string;
  customer_id: string;
  writer_id: string;
  point: number;
  book: BookOrder;
  writer: WriterOrder;
}

interface IUserData {
  id: string;
  name: string;
  email: string;
  role: string;
  point: number;
  createdAt: string;
  updatedAt: string;
}
