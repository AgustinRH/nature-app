import type { APIRoute } from 'astro';
import { prisma } from '../../../../lib/db';

// POST: Crear una nueva imagen para un animal
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
    const { url } = await request.json();

    if (!url || url.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'URL de imagen requerida' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validar que sea una URL válida
    try {
      new URL(url);
    } catch {
      return new Response(JSON.stringify({ error: 'URL de imagen inválida' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Crear imagen
    const imagen = await prisma.imagen.create({
      data: {
        animalId: animalId,
        url: url.trim(),
      },
    });

    return new Response(JSON.stringify(imagen), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al crear imagen:', error);
    return new Response(JSON.stringify({ error: 'Error al crear imagen' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// GET: Obtener todas las imágenes de un animal
export const GET: APIRoute = async ({ params }) => {
  const animalId = parseInt(params.id || '0');

  try {
    const imagenes = await prisma.imagen.findMany({
      where: { animalId: animalId },
      orderBy: { createdAt: 'desc' },
    });

    return new Response(JSON.stringify(imagenes), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener imágenes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE: Eliminar una imagen
export const DELETE: APIRoute = async ({ params, request, cookies }) => {
  let userId = parseInt(cookies.get('user_id')?.value || '0');
  const userName = cookies.get('user_name')?.value;
  const userRole = cookies.get('user_role')?.value;

  if (!userId && userName) {
    const userByName = await prisma.user.findFirst({ where: { nombre: userName }, select: { id: true } });
    if (userByName) userId = userByName.id;
  }

  if (!userId || userRole !== 'ADMIN') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { imagenId } = await request.json();

    const imagen = await prisma.imagen.delete({
      where: { id: imagenId },
    });

    return new Response(JSON.stringify(imagen), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar imagen' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
