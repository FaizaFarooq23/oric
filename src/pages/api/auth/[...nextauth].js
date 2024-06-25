import prisma from "@/lib/prisma";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials", // <- add this line
            name: 'Login',
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                const { username, password } = credentials;

                const user = await prisma.Account.findFirst({
                    where: {
                        username: username,
                    }
                });

                if (user !== null && user !== undefined) {
                    // Check if the user is admin
                    if (username!=="admin@email.com") {
                        // Compare the hash using bcrypt for non-admin users
                        const matched = await bcrypt.compare(password, user.password);

                        if (matched) {
                            await prisma.AccessLogs.create({
                                data: {
                                    account_number: user.account_number,
                                    updated_at: new Date(),
                                }
                            });
                            return user;
                        } else {
                            throw new Error("Invalid Password");
                        }
                    } else {
                        // Skip password check for admin
                        await prisma.AccessLogs.create({
                            data: {
                                account_number: user.account_number,
                                updated_at: new Date(),
                            }
                        });
                        return user;
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
        maxAge: 1 * 60 * 60, // 1 hour
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    }
});
