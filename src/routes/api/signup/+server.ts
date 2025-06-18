import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { getDb } from '$lib/db';

export const POST = async ({ request }) => {
  const { username, email, password } = await request.json();
  const db = await getDb();

  const existingEmail = await db.collection('users').findOne({ email });
  if (existingEmail) return json({ error: 'Email already exists' }, { status: 400 });

  const existingUsername = await db.collection('users').findOne({ username });
  if (existingUsername) return json({ error: 'Username already exists' }, { status: 400 });

  const hash = await bcrypt.hash(password, 10);
  await db.collection('users').insertOne({ username, email, password: hash });

  return json({ success: true });
};
