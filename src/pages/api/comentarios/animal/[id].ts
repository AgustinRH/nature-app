import type { APIRoute } from 'astro';
import { prisma } from '../../../../lib/db';

export const POST: APIRoute = async ({ params, request, cookies }) => {
  let userId = parseInt(cookies.get('user_id')?.value || '0');
  const userName = cookies.get('user_name')?.value;
  const animalId = parseInt(params.id || '0');

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
    const { contenido } = await request.json();

    if (!contenido || contenido.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'El comentario no puede estar vacío' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Crear comentario
    const comentario = await prisma.comentario.create({
      data: {
        usuarioId: userId,
        animalId: animalId,
        contenido: contenido.trim(),
      },
      include: {
        usuario: {
          select: { id: true, nombre: true },
        },
      },
    });

    // Registrar actividad (gamificación)
    await prisma.actividad.create({
      data: {
        usuarioId: userId,
        tipo: 'comentario',
        puntos: 5,
      },
    });

    // Actualizar puntos del usuario
    await prisma.user.update({
      where: { id: userId },
      data: { puntos: { increment: 5 } },
    });

    return new Response(JSON.stringify({ success: true, comentario }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al crear comentario:', error);
    return new Response(JSON.stringify({ error: 'Error al crear comentario' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
