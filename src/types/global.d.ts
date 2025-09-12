import { Connection } from "mongoose";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      NODE_ENV: "development" | "production" | "test";
    }
  }
  interface MongooseCache {
    connection: Connection | null;
    promise: Promise<typeof import("mongoose")> | null;
  }
  var mongoose : MongooseCache | undefined;
}

export {}