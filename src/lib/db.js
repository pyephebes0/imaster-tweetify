// src/lib/db.js
import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_MONGO_URI;
const client = new MongoClient(uri);
const dbName = 'xpost_app';

export async function getDb() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
}
