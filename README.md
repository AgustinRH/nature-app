# 🌿 NatureApp - Gestión de Especies y Hábitats

**Descripción corta:** NatureApp es una aplicación web construida con **Astro** (SSR) y **TypeScript** para catalogar especies, gestionar usuarios y administrar multimedia (imágenes). Está pensada para practicar y demostrar conceptos full‑stack como routing dinámico, autenticación básica, carga de archivos y uso de un ORM (Prisma) con migraciones.

---

## 📌 Contenido de este README
- Visión general
- Funcionalidades
- Tecnologías
- Instalación y puesta en marcha
- Prisma (migraciones y generación de cliente)
- Estructura del proyecto
- Flujo de desarrollo y comandos útiles
- Despliegue y recomendaciones
- Troubleshooting y soluciones comunes

---

## ✨ Funcionalidades principales
- Autenticación básica: registro, login y logout
- CRUD de animales: crear, listar, ver detalle y eliminar
- Subida de imágenes y visualización en ficha/galería
- Layouts reutilizables con componentes `.astro`
- Rutas públicas y protegidas (ej.: `/animal/add-animal`)
- Persistencia con Prisma (SQLite por defecto, fácil migración a PostgreSQL)

---

## 🧭 Tecnologías principales
- **Framework:** Astro (SSR)
- **Lenguaje:** TypeScript
- **ORM:** Prisma (SQLite por defecto)
- **Server adapter:** `@astrojs/node`
- **Auth helper:** `bcryptjs` para hashing de contraseñas
- **Build tools:** npm scripts

---

## Requisitos previos
- Node.js >= 18
- npm
- (Opcional) SQLite o PostgreSQL si deseas cambiar el provider

---


## 🛠️ Instalación y Ejecución (detallado)

Sigue estos pasos para poner el proyecto en marcha localmente.

1. Clonar el repositorio
```bash
git clone <tu-repo-url>
cd nature-app
```

2. Instalar dependencias
```bash
npm install
```

3. Variables de entorno
- Por defecto el proyecto usa SQLite con `file:./dev.db` en `prisma/schema.prisma`.
- Si quieres usar PostgreSQL u otra DB, crea un `.env` con `DATABASE_URL`:
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/naturedb"
```

4. Migraciones y Prisma
```bash
# Crea y aplica migración de dev (crea dev.db cuando uses SQLite)
npx prisma migrate dev --name init
# Genera/actualiza el cliente de prisma
npx prisma generate
# Abre Prisma Studio para ver datos de la DB
npx prisma studio
```

5. Levantar la app en desarrollo
```bash
npm run dev
```

6. Build y preview (producción local)
```bash
npm run build
npm run preview
```

---

## 📂 Estructura de Carpetas (MVC)
- `src/pages/`: Vistas y controladores (rutas y frontmatter server-side).
- `src/components/`: Componentes UI reutilizables.
- `src/layouts/`: Plantillas base (ej. `MainLayout.astro`).
- `src/lib/`: Código compartido, helpers y `db.ts` (inicializa PrismaClient).
- `prisma/`: `schema.prisma` y migraciones.
- `public/uploads/`: Almacenamiento local de imágenes subidas por los usuarios.

---

## 🐘 Prisma: notas rápidas y recomendaciones
- Mantén sincronizadas las versiones de `prisma` y `@prisma/client`.
- Siempre que cambies `schema.prisma` ejecuta:
  ```bash
  npx prisma migrate dev --name <nombre>
  npx prisma generate
  ```
- Usa `npx prisma studio` para una interfaz rápida y visual de la DB.

---

## ✅ Buenas prácticas y recomendaciones
- Usar `loading="lazy"` en imágenes grandes para mejorar rendimiento.
- Validar y sanitizar datos entrantes en endpoints y formularios.
- Proteger rutas administrativas y operaciones críticas con checks de sesión/permiso.

---

## 🧪 Tests y CI (recomendado)
- Añadir tests unitarios con `Vitest` o `Jest`.
- Configurar un pipeline de CI que ejecute lint, tests y build.

---

## 🤝 Contribuir
1. Fork
2. Crea rama `feature/xxx` o `fix/xxx`
3. Abre PR con la descripción y pruebas o pasos para reproducir

---

## 📄 Licencia
No hay licencia especificada. Añade un archivo `LICENSE` si deseas compartir el proyecto públicamente bajo una licencia concreta.

