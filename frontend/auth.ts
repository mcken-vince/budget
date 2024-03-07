import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';
import { apiFetch } from '@helpers/clients';
import { encode, decode } from 'next-auth/jwt';

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.JWTKEY as string,
  session: { strategy: 'jwt' },
  jwt: { encode, decode },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      id: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const response = await apiFetch('auth/login', {
          method: 'POST',
          data: { username: credentials.email, password: credentials.password },
        });

        const user = response?.user;
        if (!user) {
          return null;
        }
        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          auth_token: response.token,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, credentials }) {
      console.log('signIn callback');
      const dbUser = await apiFetch(`user/email/${credentials?.email}`);
      if (dbUser) {
        user.id = dbUser.id;
        user.firstName = dbUser.firstName;
        user.lastName = dbUser.lastName;
        user.email = dbUser.email;

        return true;
      } else {
        // Return false to display a default error message
        return '/login?error=loginError';
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, user, account, profile, session }) {
      console.log('jwt callback', { token, user, account });
      // if (account) {
      //   token.auth_token = signJwt({
      //     user: token.user,
      //     sub: token.sub,
      //     id_token: account.id_token,
      //     access_token: account.access_token,
      //     expires_at: account.expires_at,
      //   });
      // }
      if (user) {
        token.user = {
          id: parseInt(user.id + ''),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email + '',
        };
        token.auth_token = signJwt(token);
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log('session callback');

      return {
        ...session,
        auth_token: token.auth_token,
        user: {
          ...session.user,
          firstName: token?.user?.firstName,
          lastName: token?.user?.lastName,
          email: token?.user?.email,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      console.log('redirect callback', { url, baseUrl });
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});

export const signJwt = (payload: any, expiresIn = '1d') => {
  const token = jwt.sign(payload, process.env.JWTKEY as string, {
    // algorithm: "HS512",
    expiresIn,
  });
  return token;
};

function verifyJwt(token: string) {
  const data = jwt.verify(token, process.env.JWTKEY as string, {
    // algorithms: ["HS512"],
  });
  return data;
}
