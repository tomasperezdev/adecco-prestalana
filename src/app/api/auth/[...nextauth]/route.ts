import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions:NextAuthOptions = {
  providers: [
    //Add more providers here
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo electrónico", type: "email", placeholder: "usuario@google.com" },
        password: { label: "Contraseña", type: "password", placeholder: '******' }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if( credentials?.email === undefined || credentials?.password === undefined ) {
            return null;
        }
        else{
            return { email: credentials.email, password: credentials.password, name: 'Demo User', id: 'demo-user', image: 'https://www.gravatar.com/avatar/' + 'demo-user'};
        }
      }
    }),
  ],

  session: {
    strategy: 'jwt'
  },

  callbacks: {

    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async jwt({ token, user, account, profile }) {
      token.roles = ['no-roles'];
      token.id    = 'no-uuid';
      return token;
    },

    async session({ session, token, user }) {
      
      if ( session && session.user ) {
        session.user.id = token.id;
      }

      return session;
    }
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };