import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Email and password are required')
        }

        const { email, password } = credentials
        try {
          const user = await prisma.user.findUnique({
            where: { email: email as string }
          })

          if (!user) {
            throw new Error('Invalid email or password')
          }

          const isPasswordValid = await bcrypt.compare(
            password as string,
            user.password
          )

          if (!isPasswordValid) {
            throw new Error('Invalid email or password')
          }

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async signIn({ user, account,profile }) {
      // console.log('OAuth Sign-in Details:', {
      //   user,
      //   account,
      //   profile
      // });
      if (account?.provider === 'google' || account?.provider === 'github') {
        try {
          const { email, name } = user
          let existingUser = await prisma.user.findUnique({
            where: { email: email! }
          })

          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: email!,
                name: name || '',
                password: bcrypt.hashSync(
                  Math.random().toString(36).slice(-8),
                  10
                )
              }
            })
          }

          return true
        } catch (error) {
          console.error(`${account.provider} sign-in error:`, error)
          return false
        }
      }
      return true
    }
  }
})