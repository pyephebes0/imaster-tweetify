import type { RequestHandler } from '@sveltejs/kit';
import { getDb } from '$lib/db';
import { ObjectId } from 'mongodb';

export const GET: RequestHandler = async ({ params }) => {
  const id = params.id;
  if (!id) return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 });

  try {
    const db = await getDb();
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  }
};
