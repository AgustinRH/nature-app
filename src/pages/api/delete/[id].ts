import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/db';

export const POST: APIRoute = async ({ params, redirect }) => {
  const { id } = params;

  if (!id) {
    return new Response("ID no proporcionado", { status: 400 });
  }

  try {
    await prisma.animal.delete({
      where: { id: Number(id) },
    });
    // Redirigir a la home tras borrar
    return redirect('/', 303);
  } catch (error) {
    return new Response("Error al eliminar el animal", { status: 500 });
  }
};