import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!user) return null;

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) return null;

                return { id: user.customerID, givenName: user.givenName, lastName: user.lastName, email: user.email };
            },
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;         
                token.givenName = user.givenName;    
                token.lastName = user.lastName;
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                if (!session?.user) return session; 
                session.user.customerID = token.id;
                session.user.givenName = token.givenName;  // add custom field
                session.user.lastName = token.lastName;
                session.user.email = token.email;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // must export GET and POST for App Router
