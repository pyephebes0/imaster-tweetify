// src/routes/api/x/disconnect/[id]/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { getDb } from '$lib/db';
import { ObjectId } from 'mongodb';

export const DELETE: RequestHandler = async ({ params }) => {
  const db = await getDb();
  await db.collection('x_accounts').deleteOne({ _id: new ObjectId(params.id) });
  return json({ success: true });
};
