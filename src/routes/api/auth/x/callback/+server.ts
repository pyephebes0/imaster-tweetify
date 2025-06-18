// src/routes/api/auth/x/callback/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { redirect, json } from '@sveltejs/kit';
import { getDb } from '$lib/db';

const CLIENT_ID = process.env.X_CLIENT_ID!;
const CLIENT_SECRET = process.env.X_CLIENT_SECRET!;
const REDIRECT_URI = process.env.X_CALLBACK_URL!;

console.log('✅ Client ID:', CLIENT_ID); // ถ้าได้ undefined แปลว่ายังไม่โหลด

export const GET: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get('code');
  if (!code) return json({ error: 'Missing code' }, { status: 400 });

  const tokenRes = await fetch('https://api.twitter.com/2/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
      code_verifier: 'challenge'
    })
  });

  const tokenData = await tokenRes.json();
  console.log('✅ tokenData:', tokenData)

  if (!tokenRes.ok) {
    console.error('❌ Token error:', tokenData);
    return json({ error: 'Failed to get access token', details: tokenData }, { status: 400 });
  }

  // ดึงข้อมูลผู้ใช้
  const userRes = await fetch('https://api.twitter.com/2/users/me', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`
    }
  });

  const user = await userRes.json();
  if (!user?.data?.id) {
    return json({ error: 'Failed to fetch user info', details: user }, { status: 400 });
  }

  // บันทึกลง DB
  const db = await getDb();
  await db.collection('x_accounts').insertOne({
    id: user.data.id,
    username: user.data.username,
    name: user.data.name,
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token
  });

  throw redirect(302, '/settings');
};
