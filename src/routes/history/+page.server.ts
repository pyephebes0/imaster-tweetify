import type { PageServerLoad } from './$types';
import { getSessionUser } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  const user = await getSessionUser(event);
  if (!user) {
    throw redirect(302, '/login');
  }
  
  // Return user data หรือ data อื่นๆที่ต้องใช้
  return {
    user
  };
};
