import { id } from './../../../node_modules/effect/src/Fiber';
import { version } from './../../../node_modules/@types/react-dom/index.d';
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Stripe from "stripe"

const prisma = new PrismaClient()

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    events: {
        createUser: async ({ user }) => {
            // get stripe access
            const stripe = new Stripe(process.env.STRIP_SECRET_KEY!)
            // create stripe customer
            if (user.name && user.email) {
                const customer = await stripe.customers.create({
                    name: user.name,
                    email: user.email
                })
                // update prisma user model with stripe customer id
                await prisma.user.update({
                    where: { id: user.id },
                    data: { stripeCustomerId: customer.id }
                })
            }
        }
    }
})