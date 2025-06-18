// src/routes/profile/[id]/+page.server.ts
import type { PageServerLoad } from './$types';
import { getSessionUserId } from '$lib/auth';
import { getDb } from '$lib/db';
import { ObjectId } from 'mongodb';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  const sessionUserId = getSessionUserId(event);
  const profileId = event.params.id;

  // ถ้ายังไม่ได้ login → redirect ไป login
  if (!sessionUserId) {
    throw redirect(302, '/login');
  }

  // ตัวเลือก: จำกัดให้เจ้าของดูได้เท่านั้น
  if (sessionUserId !== profileId) {
    throw redirect(302, '/login');
  }

  const db = await getDb();
  const user = await db.collection('users').findOne(
    { _id: new ObjectId(profileId) },
    { projection: { password: 0 } }
  );

  if (!user) {
    throw redirect(302, '/login');
  }

  return {
    user
  };
};
