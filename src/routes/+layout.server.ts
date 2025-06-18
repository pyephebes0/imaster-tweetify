// src/routes/+layout.server.ts
import { getSessionUser } from '$lib/auth'; // ✅ ต้องตรงชื่อที่ export

export const load = async (event) => {
  const user = await getSessionUser(event); // จะ error ถ้า getSessionUser ไม่ได้ถูก export จริง
  return { user };
};
