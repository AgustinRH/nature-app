# 🚂 Guía de Deploy en Railway

Esta guía te llevará paso a paso para desplegar NatureApp en Railway.

## 📋 Pre-requisitos

- Cuenta en [GitHub](https://github.com)
- Repositorio de tu proyecto subido a GitHub
- Cuenta en [Railway](https://railway.app) (puedes usar login con GitHub)

## 🚀 Paso a Paso

### 1. Preparar el repositorio

Asegúrate de que tu proyecto esté en GitHub y que hayas hecho commit de todos los cambios:

```bash
git add .
git commit -m "Preparar proyecto para deploy en Railway"
git push origin main
```

### 2. Crear proyecto en Railway

1. Ve a [railway.app](https://railway.app)
2. Haz clic en **"New Project"**
3. Selecciona **"Deploy from GitHub repo"**
4. Autoriza a Railway para acceder a tus repositorios (si es la primera vez)
5. Selecciona el repositorio **nature-app**

### 3. Configurar variables de entorno

Railway necesita las mismas variables que tienes en tu `.env` local:

1. En el dashboard del proyecto, haz clic en tu servicio
2. Ve a la pestaña **"Variables"**
3. Haz clic en **"New Variable"** y agrega cada una:

```env
ADMIN_ACCESS_CODE=tu_codigo_super_secreto
DATABASE_URL=file:./prod.db
NODE_ENV=production
```

**Importante:** Cambia `tu_codigo_super_secreto` por una contraseña segura diferente a la de desarrollo.

### 4. Configurar volúmenes persistentes (CRÍTICO)

Para que SQLite y las imágenes subidas persistan entre deploys:

#### Volumen para la base de datos:
1. Ve a **"Settings"** → **"Volumes"**
2. Haz clic en **"New Volume"**
3. Nombre: `prisma-db`
4. Mount path: `/app/prisma`
5. Haz clic en **"Add"**

#### Volumen para imágenes:
1. Haz clic en **"New Volume"** de nuevo
2. Nombre: `user-uploads`
3. Mount path: `/app/public/uploads`
4. Haz clic en **"Add"**

### 5. Verificar configuración de build

Railway debería detectar automáticamente la configuración gracias a `railway.json` y `nixpacks.toml`.

Verifica que en la pestaña **"Settings"** → **"Deploy"** tenga:
- ✅ Build Command: `npm run build`
- ✅ Start Command: `npm run start`

### 6. Desplegar

1. Railway iniciará el deploy automáticamente
2. Puedes ver el progreso en la pestaña **"Deployments"**
3. El proceso incluye:
   - ✅ Instalar dependencias
   - ✅ Generar cliente de Prisma
   - ✅ Aplicar migraciones
   - ✅ Construir la aplicación
   - ✅ Iniciar el servidor

### 7. Obtener la URL pública

1. Ve a **"Settings"** → **"Networking"**
2. Haz clic en **"Generate Domain"**
3. Railway te dará una URL como: `https://nature-app-production-xxxx.up.railway.app`
4. ¡Visita tu app!

### 8. Cargar datos iniciales (seed) [OPCIONAL]

Si quieres poblar la base de datos con datos de prueba:

1. Instala Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Inicia sesión y vincula tu proyecto:
   ```bash
   railway login
   railway link
   ```

3. Ejecuta el seed:
   ```bash
   railway run npx prisma db seed
   ```

## 🔄 Deploys automáticos

Cada vez que hagas `git push` a tu rama principal, Railway desplegará automáticamente los cambios.

## 📊 Monitoreo

- **Ver logs en tiempo real**: Pestaña "Deployments" → Click en el deploy actual → "View Logs"
- **Métricas**: Railway muestra uso de CPU, memoria y ancho de banda
- **Rollback**: Si algo sale mal, puedes hacer rollback a un deploy anterior desde "Deployments"

## 🐛 Troubleshooting

### Error: "Cannot find module './dev.db'"
**Solución:** Verifica que el volumen esté montado en `/app/prisma` y que `DATABASE_URL=file:./prod.db`

### Error: "prisma:client not found"
**Solución:** El build command debe incluir `npx prisma generate`. Verifica `package.json` → `scripts` → `build`

### Las imágenes desaparecen después del deploy
**Solución:** Asegúrate de tener el volumen para `/app/public/uploads`

### No puedo hacer login como admin
**Solución:** Verifica que `ADMIN_ACCESS_CODE` esté configurado en las variables de entorno de Railway

## 💰 Costos

Railway ofrece:
- **$5 USD gratis al mes** para todos los usuarios
- Después se cobra por uso real (CPU, RAM, ancho de banda)
- Para esta app pequeña, probablemente te mantengas dentro del tier gratuito

## 🔐 Seguridad

Antes de ir a producción:
- [ ] Cambia `ADMIN_ACCESS_CODE` a un valor seguro
- [ ] Considera agregar rate limiting para prevenir spam
- [ ] Habilita HTTPS (Railway lo hace automáticamente)
- [ ] Revisa los permisos de los endpoints de API

## 📚 Recursos

- [Documentación de Railway](https://docs.railway.app)
- [Railway CLI](https://docs.railway.app/develop/cli)
- [Prisma en producción](https://www.prisma.io/docs/guides/deployment/deployment-guides)

---

¿Problemas? Abre un issue en el repositorio o contacta al equipo de soporte de Railway.
