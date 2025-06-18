// src/lib/stores/auth.js
import { writable } from 'svelte/store';
export const user = writable(null);

export async function login(token) {
  // call backend login/composio
  const res = await fetch('/api/login', {/*...*/});
  user.set(await res.json());
}
