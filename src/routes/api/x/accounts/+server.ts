// src/routes/api/x/accounts/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { getDb } from '$lib/db';

export const GET: RequestHandler = async () => {
  const db = await getDb();
  const accounts = await db.collection('x_accounts').find({}, { projection: { access_token: 0, refresh_token: 0 } }).toArray();
  return json(accounts);
};
