
import mongoose from 'mongoose';

// The MONGODB_URI should include the database name.
// e.g., mongodb+srv://<user>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI.includes('<YOUR_MONGODB_URI')) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local. It must include your database name.'
  );
}

// We use a cached connection to avoid creating a new connection for every request in serverless environments.
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // The opts object no longer needs dbName since it should be in the URI.
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  
  return cached.conn;
}

export default dbConnect;
