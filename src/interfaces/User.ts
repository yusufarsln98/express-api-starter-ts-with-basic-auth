import MessageResponse from './MessageResponse';

export default interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  token?: string | null;
}

interface LoginResponse extends MessageResponse {
  user: Pick<User, 'id' | 'token'>;
}

export { LoginResponse };
