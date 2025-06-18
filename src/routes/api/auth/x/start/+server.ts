// src/routes/api/auth/x/start/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { X_CLIENT_ID, X_CALLBACK_URL } from '$env/static/private';

const state = crypto.randomUUID();

export const GET: RequestHandler = async () => {
  const CLIENT_ID = X_CLIENT_ID;
  const REDIRECT_URI = X_CALLBACK_URL;

  const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=tweet.read%20tweet.write%20users.read%20offline.access&state=${state}&code_challenge=challenge&code_challenge_method=plain`;  

  throw redirect(302, authUrl);
};
