// src/routes/setting/+page.server.ts
import type { PageServerLoad } from './$types';
import { getSessionUserId } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  const userId = getSessionUserId(event);

  if (!userId) {
    throw redirect(302, '/login');
  }

  return {};
};
