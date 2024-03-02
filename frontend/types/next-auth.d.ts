import {
  DefaultSession,
  User as UserInterface,
  JWT as JWTInterface,
} from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
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
}
declare module 'next-auth/jwt' {
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
