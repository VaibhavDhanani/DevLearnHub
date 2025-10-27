import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

const cached: MongooseCache = global.mongoose || {
  connection: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

export const connectDB = async (): Promise<Connection> => {
  if (cached.connection && cached.connection.readyState === 1) {
    console.log("Using existing MongoDB connection");
    return cached.connection;
  }

  if (!cached.promise) {
    const options = {
      dbName: "devlearndb",
      bufferCommands: false,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      retryWrites: true,
      retryReads: true,
    };

    console.log("Creating new MongoDB connection...");
    
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongooseInstance) => {
      console.log("✅ MongoDB connected successfully");
      return mongooseInstance;
    });
  }

  try {
    const mongooseInstance = await cached.promise;
    cached.connection = mongooseInstance.connection;
    
    cached.connection.on('connected', () => {
      console.log('MongoDB connected');
    });
    
    cached.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    cached.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    return cached.connection;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    
    cached.promise = null;
    cached.connection = null;
    
    if (error instanceof Error) {
      throw new Error(`Failed to connect to MongoDB: ${error.message}`);
    } else {
      throw new Error("Failed to connect to MongoDB: Unknown error");
    }
  }
};

export const isConnected = (): boolean => {
  return cached.connection?.readyState === 1;
};

export const disconnectDB = async (): Promise<void> => {
  try {
    if (cached.connection && cached.connection.readyState === 1) {
      await mongoose.disconnect();
      cached.promise = null;
      cached.connection = null;
      console.log("✅ MongoDB disconnected successfully");
    }
  } catch (error) {
    console.error("❌ Error disconnecting from MongoDB:", error);
    throw error;
  }
};