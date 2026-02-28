import type { APIRoute } from 'astro';
import { prisma } from '../../../../lib/db';

export const POST: APIRoute = async ({ params, cookies }) => {
  let userId = parseInt(cookies.get('user_id')?.value || '0');
  const userName = cookies.get('user_name')?.value;
  const plantaId = parseInt(params.id || '0');

  if (!userId && userName) {
    const userByName = await prisma.user.findFirst({ where: { nombre: userName }, select: { id: true } });
    if (userByName) userId = userByName.id;
  }

  if (!userId) {
    return new Response(JSON.stringify({ error: 'No autenticado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Verificar si ya existe el favorito
    const existente = await prisma.favorito.findUnique({
      where: {
        usuarioId_plantaId: {
          usuarioId: userId,
          plantaId: plantaId,
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
          plantaId: plantaId,
        },
      });
    }

    return new Response(JSON.stringify({ success: true, isFavorite: !existente }), {
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
