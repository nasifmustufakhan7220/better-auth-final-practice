import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);
const mongodb = process.env.BETTER_AUTH_MONGODB_CONNECT_STRING;

if (!mongodb) {
  throw new Error("BETTER_AUTH_URL is not defined");
}

const client = new MongoClient(mongodb);
const db = client.db("user");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Verify your email address",
        html: `Click <a href="${url}">here</a> to verify your email.`,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600,
  },
  socialProviders: {
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT as string,
      clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SERECT as string,
    },
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SERECT as string,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
