import prisma from "@/lib/prisma";
import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
    providers: [

        CredentialsProvider({
            id: "credentials", // <- add this line
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Login',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {

                const formdata = new FormData();
                formdata.append("username", credentials.username);
                formdata.append("password", credentials.password);
                const username = credentials.username
                const password = credentials.password

                


                const user = await prisma.Account.findFirst({
                    where: {
                        username: username,
                    }
                })
                if (user !== null && user !== undefined && user.length !== 0) {
                    //Compare the hash
                    if (password === user.password) {
                        const res = await prisma.AccessLogs.create(
                            {
                                data: {
                                    account_number: user.account_number,
                                    updated_at: new Date(),
                                }
                            }
                        )
                        return user;
                    } else {
                        throw new Error("Invalid Password");
                    }
                } else {
                    throw new Error("User not found");
                }

            }
        }),
    ],
    secret: process.env.SECRET,
    pages: {
        signIn: "/",
    },
    session: {
        strategy: "jwt",
        maxAge: 1 * 60 * 60, // 1 hours
    },
    callbacks: {
        async jwt({ token, user }) {
            // Persist the OAuth access_token to the token right after signin
            if (user) {
                token.user = user
               //token.accessToken = user.token
                //token.role = 'Faculty'
            }
            return token
        },
        async session({ session, token }) {
            session.user = token.user
            return session
        },
    }
})