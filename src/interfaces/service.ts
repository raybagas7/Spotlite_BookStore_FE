interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  role?: 'admin';
}
interface LoginUpPayload {
  email: string;
  password: string;
}

interface OrderPayload {
  book_id: string;
  writer_id: string;
  point: number;
}

interface NewBookPayload {
  title: string;
  cover: string;
  point: number;
  tags: string[];
}

interface NewTagPayload {
  name: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  point: number;
  createdAt: string;
  updatedAt: string;
}

interface SignupResponse {
  token: string;
  user: UserData;
}

interface LoginResponse {
  token: string;
  user: UserData;
}

interface SuccessOrderResponse {
  book_id: string;
  customer_id: string;
  point: number;
  writer_id: string;
  order_id: string;
}
interface SuccessAddNewBookResponse {
  title: string;
  cover: string;
  point: number;
  writer_id: string;
  book_id: string;
  createdAt: string;
  updatedAt: string;
}
