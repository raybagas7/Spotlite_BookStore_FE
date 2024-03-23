interface SignUpPayload {
  name: string;
  email: string;
  password: string;
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
