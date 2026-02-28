import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Email inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verificar si ya está suscrito
    const existente = await prisma.newsletterSuscriptor.findUnique({
      where: { email },
    });

    if (existente) {
      return new Response(JSON.stringify({ 
        message: 'Ya estás suscrito a nuestra newsletter',
        isNew: false 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Crear nueva suscripción
    await prisma.newsletterSuscriptor.create({
      data: { email },
    });

    return new Response(JSON.stringify({ 
      message: '¡Gracias por suscribirte!',
      isNew: true 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error en newsletter:', error);
    return new Response(JSON.stringify({ error: 'Error al suscribirse' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
