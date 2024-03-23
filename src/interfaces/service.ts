interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

interface UserData {
  email: string;
  id: string;
  name: string;
  point: number;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface SignupResponse {
  token: string;
  user: UserData;
}
