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
- CRUD de animales: crear, listar, ver detalle, editar y eliminar
- Edición y borrado solo para ADMIN
- Nuevo endpoint para eliminar animales (`/api/delete/[id]`)
- Página de edición de animales (`/editar/[id]`), solo accesible para ADMIN
- Login con código especial para acceso ADMIN temporal (campo opcional en el formulario de acceso; configurable mediante variable de entorno `ADMIN_ACCESS_CODE`)
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
ADMIN_ACCESS_CODE="tu_codigo_secreto"
```
- `ADMIN_ACCESS_CODE`: Código secreto para acceso temporal como administrador en el login (por defecto: `admin1234`)

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
  - `add-animal.astro`: Alta de animales
  - `animal/[id].astro`: Ficha de detalle
  - `editar/[id].astro`: Edición de animales (solo ADMIN)
  - `api/delete/[id].ts`: Endpoint para eliminar animales (solo ADMIN)
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

## 🚀 Deploy a Producción

### Opción recomendada: Railway

Railway es ideal para esta aplicación porque soporta SQLite sin cambios y ofrece sistema de archivos persistente para las imágenes subidas.

#### Pasos para deployar en Railway:

1. **Crear cuenta y proyecto**
   - Ve a [railway.app](https://railway.app) y crea una cuenta
   - Haz clic en "New Project" → "Deploy from GitHub repo"
   - Selecciona tu repositorio `nature-app`

2. **Configurar variables de entorno**
   - En el panel de Railway, ve a la pestaña "Variables"
   - Agrega las siguientes variables:
     ```
     ADMIN_ACCESS_CODE=tu_codigo_secreto_seguro
     DATABASE_URL=file:./prod.db
     NODE_ENV=production
     ```

3. **Configurar almacenamiento persistente (para SQLite y uploads)**
   - En "Settings" → "Volumes"
   - Crea un volumen montado en `/app/prisma` para la base de datos
   - Crea otro volumen montado en `/app/public/uploads` para las imágenes

4. **Deploy automático**
   - Railway detectará automáticamente la configuración (gracias a `railway.json` y `nixpacks.toml`)
   - El proyecto se construirá y desplegará automáticamente
   - Cada push a `main` disparará un nuevo deploy

5. **Acceder a tu aplicación**
   - Railway te proporcionará una URL pública tipo `https://nature-app-production.up.railway.app`

#### Comandos útiles después del deploy:

```bash
# Ver logs en tiempo real
railway logs

# Ejecutar comandos en el servidor (si instalaste Railway CLI)
railway run npx prisma studio
railway run npx prisma db seed
```

### Otras opciones de deploy:

- **Render**: Similar a Railway, soporta discos persistentes
- **Fly.io**: Excelente para SQLite, requiere Dockerfile
- **VPS tradicional** (DigitalOcean, Linode): Control total pero más configuración manual

⚠️ **Nota sobre Vercel**: No recomendado para esta app ya que no soporta SQLite ni almacenamiento de archivos persistente.

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
Este proyecto se publica bajo la licencia **MIT**. Consulta el archivo `LICENSE` para los términos completos.

**Licencia:** MIT © 2026 Agustin

