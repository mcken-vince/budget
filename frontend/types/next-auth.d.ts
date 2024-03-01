import {
  Session as SessionInterface,
  User as UserInterface,
  JWT as JWTInterface,
} from 'next-auth';

declare module 'next-auth' {
  interface Session extends SessionInterface {
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
    };
    auth_token: string;
  }

  interface User extends UserInterface {
    id: number;
    firstName: string;
    lastName: string;
  }

  interface JWT extends JWTInterface {
    token: string;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
    };
  }
}
