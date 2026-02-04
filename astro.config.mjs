import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  // 1. Activamos el modo servidor para permitir lógica Backend (Cookies, POST, DB)
  output: 'server',

  // 2. Usamos el adaptador de Node.js para que funcione en Ubuntu/WSL
  adapter: node({
    mode: 'standalone',
  }),

  // 3. Configuración opcional para mayor seguridad en formularios
  server: {
    port: 4321,
    host: true, // Esto ayuda a que WSL sea accesible desde el navegador de Windows
  }
});