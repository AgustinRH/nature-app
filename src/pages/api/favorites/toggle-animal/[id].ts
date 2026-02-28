import type { APIRoute } from 'astro';
import { prisma } from '../../../../lib/db';

export const POST: APIRoute = async ({ params, cookies, redirect }) => {
  let userId = parseInt(cookies.get('user_id')?.value || '0');
  const userName = cookies.get('user_name')?.value;
  const animalId = parseInt(params.id || '0');

  if (!userId && userName) {
    const userByName = await prisma.user.findFirst({ where: { nombre: userName }, select: { id: true } });
    if (userByName) userId = userByName.id;
  }

  if (!userId) {
    return redirect('/login');
  }

  try {
    // Verificar si ya existe el favorito
    const existente = await prisma.favorito.findUnique({
      where: {
        usuarioId_animalId: {
          usuarioId: userId,
          animalId: animalId,
        },
      },
    });

    if (existente) {
      // Si existe, eliminarlo
      await prisma.favorito.delete({
        where: { id: existente.id },
      });
    } else {
      // Si no existe, crearlo
      await prisma.favorito.create({
        data: {
          usuarioId: userId,
          animalId: animalId,
        },
      });
    }

    // Redirigir de vuelta a la página anterior
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return new Response(JSON.stringify({ error: 'Error al guardar favorito' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
