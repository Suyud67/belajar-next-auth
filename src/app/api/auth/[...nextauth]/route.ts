import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      // fungsinya display untuk button (exp: 'Sign in with {name})
      name: 'credentials',

      // bagian ini berfungsi membuat default form dari next auth
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials: any) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user: any = {
          id: 1,
          email: 'udin@gmail.com',
          status: 'user',
        };

        if (email === 'udin@gmail.com' && password === '123123') {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === 'credentials') {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.email = user.email;
        token.status = user.status;
      }
      return token;
    },

    async session({ session, user, token }: any) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.status = token.status;
      session.accessToken = token.accessToken;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
