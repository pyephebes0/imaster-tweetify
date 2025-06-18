import { json } from '@sveltejs/kit';
import { getDb } from '$lib/db';

export async function GET() {
  const db = await getDb();
  const posts = await db.collection('posts').find().sort({ createdAt: -1 }).toArray();

  return json({ posts });
}
