// Helper para manejar rutas de uploads en diferentes entornos
import path from 'path';

/**
 * Obtiene el directorio de uploads según el entorno
 * - Desarrollo: ./public/uploads
 * - Producción (Render): /opt/render/project/data/uploads (persistente)
 */
export function getUploadsDir(): string {
  const isProduction = process.env.NODE_ENV === 'production';
  const isRender = process.env.RENDER === 'true';
  
  if (isProduction && isRender) {
    // En Render, usar el disco persistente
    return '/opt/render/project/data/uploads';
  }
  
  // Desarrollo local
  return path.join(process.cwd(), 'public', 'uploads');
}

/**
 * Obtiene la URL pública de un archivo subido
 * @param fileName - Nombre del archivo
 */
export function getUploadUrl(fileName: string): string {
  return `/uploads/${fileName}`;
}
