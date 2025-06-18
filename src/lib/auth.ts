// src/lib/auth.ts
import { getDb } from './db';
import { ObjectId } from 'mongodb';
import type { RequestEvent } from '@sveltejs/kit';

export async function getSessionUser(event: RequestEvent) {
  const session = event.cookies.get('session');
  if (!session) return null;

  const db = await getDb();
  const user = await db.collection('users').findOne(
    { _id: new ObjectId(session) },
    { projection: { password: 0 } }
  );
  return user;
}
