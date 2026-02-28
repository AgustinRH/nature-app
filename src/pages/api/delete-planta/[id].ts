import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/db';

export const POST: APIRoute = async ({ params, redirect, cookies }) => {
  const { id } = params;

  // Verificar que sea ADMIN
  const userRole = cookies.get('user_role')?.value;
  if (userRole !== 'ADMIN') {
    return redirect('/login', 303);
  }

  if (!id) {
    return new Response("ID no proporcionado", { status: 400 });
  }

  try {
    await prisma.planta.delete({
      where: { id: Number(id) },
    });
    // Redirigir a plantas tras borrar
    return redirect('/plantas', 303);
  } catch (error) {
    return new Response("Error al eliminar la planta", { status: 500 });
  }
};
