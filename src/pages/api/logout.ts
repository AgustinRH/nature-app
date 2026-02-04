import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ cookies, redirect }) => {
  cookies.delete('user_name', { path: '/' });
  cookies.delete('user_role', { path: '/' });
  return redirect('/');
};