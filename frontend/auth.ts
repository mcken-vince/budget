import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';
import { apiFetch } from './src/helpers/clients/fetch-client';

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: 'Yo/0duPLAErkzTcBlgWGWR4eaVyivqU6a+M/ot0fo9c=',
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      id: 'credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const response = await apiFetch('auth/login', {
          method: 'POST',
          data: credentials,
        });

        const user = response?.user;
        console.log('authorize user', { user });
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
      console.log('signIn callback', {
        user,
        account,
        credentials,
      });
      const dbUser = await apiFetch(`user/email/${credentials?.username}`);
      if (dbUser) {
        user.id = dbUser.id;
        user.firstName = dbUser.firstName;
        user.lastName = dbUser.lastName;
        user.email = dbUser.email;

        return '/';
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, user, account, profile, session }) {
      console.log('jwt callback', { token, account, profile });
      if (account) {
        token.auth_token = await signJwt({
          sub: token.sub,
          id_token: account.id_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
        });
      }
      // if (user) {
      //   token.user.id = user.id;
      //   token.user.firstName = user.firstName;
      //   token.user.lastName = user.lastName;
      //   token.email = user.email;
      // }
      return token;
    },
    async session({ session, token, user }) {
      console.log('session callback', { session, token, user });
      // session.user.id = token?.user?.id;
      // session.user.firstName = token?.user?.firstName;
      // session.user.lastName = token?.user?.lastName;
      // session.user.email = token?.email;

      session.auth_token = token.auth_token as string;
      return session;
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

export const signJwt = async (payload: any, expiresIn = '1d') => {
  const token = await jwt.sign(payload, process.env.JWTKEY as string, {
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
