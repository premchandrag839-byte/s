import mongoose from 'mongoose';

// Require environment configuration for security; do not hardcode credentials
const MONGODB_URI = process.env.MONGODB_URI;

let connectionPromise = null;

export async function connectDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!connectionPromise) {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not set');
    }
    connectionPromise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((conn) => {
      // eslint-disable-next-line no-console
      if (process.env.NODE_ENV !== 'production') console.log('MongoDB connected successfully');
      return mongoose.connection;
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.error('MongoDB connection error:', err.message);
      throw err;
    });
  }
  return connectionPromise;
}


