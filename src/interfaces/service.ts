interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}
interface LoginUpPayload {
  email: string;
  password: string;
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
