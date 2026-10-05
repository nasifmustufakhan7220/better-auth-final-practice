import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";



const mongodb = process.env.BETTER_AUTH_MONGODB_CONNECT_STRING;

if(!mongodb){
    throw new Error("BETTER_AUTH_URL is not defined");
}

const client = new MongoClient(mongodb);
const db = client.db("user");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT as string,
      clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SERECT as string,
    },
    google:{
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SERECT as string
    }
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
