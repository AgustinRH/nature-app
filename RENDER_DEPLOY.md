# 🎨 Deploy en Render.com - Guía Completa

Render.com es una plataforma que **NO requiere tarjeta de crédito** en su free tier y soporta SQLite perfectamente.

---

## ✅ Ventajas de Render

- ✅ **Free tier real** - 750 horas gratis al mes (sin tarjeta)
- ✅ **Discos persistentes** - SQLite y uploads funcionan
- ✅ **Deploy automático** desde GitHub
- ✅ **SSL gratis** - HTTPS automático
- ⚠️ **Spin-down**: La app se "duerme" tras 15 min sin tráfico (primera carga lenta)

---

## 🚀 Pasos para Deploy

### **Opción 1: Desde la Web (Más Fácil)**

#### 1. Crear cuenta
- Ve a [render.com](https://render.com)
- Haz clic en **"Get Started for Free"**
- Regístrate con GitHub (más simple)

#### 2. Crear Web Service
- En el dashboard, haz clic en **"New +"** → **"Web Service"**
- Conecta tu cuenta de GitHub si aún no lo hiciste
- Busca y selecciona tu repositorio **`nature-app`**
- Haz clic en **"Connect"**

#### 3. Configurar el servicio

**Información básica:**
- **Name:** `nature-app` (o el que prefieras)
- **Region:** `Frankfurt` (o la más cercana)
- **Branch:** `master`
- **Runtime:** `Node`

**Build & Deploy:**
- **Build Command:**
  ```bash
  npm ci && npx prisma generate && npx prisma migrate deploy && npm run build
  ```

- **Start Command:**
  ```bash
  npm run start
  ```

#### 4. Configurar variables de entorno

En la sección **"Environment Variables"**, agrega:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `file:/opt/render/project/data/prod.db` |
| `ADMIN_ACCESS_CODE` | `TuCodigoSecretoAqui123` |

#### 5. Configurar disco persistente

**IMPORTANTE**: Scroll down hasta **"Persistent Disk"**

- Haz clic en **"Add Disk"**
- **Name:** `nature-app-data`
- **Mount Path:** `/opt/render/project/data`
- **Size:** `1 GB`
- Haz clic en **"Save"**

#### 6. Crear el servicio

- **Plan:** Selecciona **"Free"** (asegúrate de estar en el tier gratuito)
- Haz clic en **"Create Web Service"**

#### 7. Esperar el deploy

- Render comenzará a construir y desplegar tu app (5-10 minutos)
- Verás los logs en tiempo real
- Una vez completado, verás **"Live"** en verde ✅

#### 8. Obtener la URL

Tu app estará disponible en:
```
https://nature-app.onrender.com
```

(O el nombre que hayas elegido)

---

### **Opción 2: Desde el archivo render.yaml (Blueprint)**

Si prefieres infraestructura como código:

#### 1. El archivo `render.yaml` ya está creado

#### 2. En Render Dashboard
- Haz clic en **"New +"** → **"Blueprint"**
- Conecta tu repositorio
- Render detectará automáticamente el `render.yaml`
- Revisa la configuración y haz clic en **"Apply"**

#### 3. Actualizar el ADMIN_ACCESS_CODE

Por defecto, Render genera uno aleatorio. Para cambiarlo:
- Ve a tu servicio
- **"Environment"** → Edita `ADMIN_ACCESS_CODE`
- Guarda (esto reiniciará el servicio)

---

## 🔍 Gestión Post-Deploy

### Ver logs
- Dashboard del servicio → Pestaña **"Logs"**
- Logs en tiempo real de tu aplicación

### Ver shell (SSH)
- Pestaña **"Shell"**
- Ejecuta comandos directamente en el contenedor:
  ```bash
  cd /opt/render/project/src
  npx prisma studio  # Ver la base de datos
  ```

### Trigger manual deploy
- Pestaña **"Manual Deploy"** → **"Deploy latest commit"**

### Ver variables de entorno
- Pestaña **"Environment"**
- Puedes editar o agregar nuevas variables

### Reiniciar servicio
- Settings → **"Restart Service"**

---

## 🔄 Actualizaciones Automáticas

Cada vez que hagas `git push` a tu rama `master`, Render automáticamente:
1. ✅ Detecta el cambio
2. ✅ Construye la nueva versión
3. ✅ Ejecuta migraciones de Prisma
4. ✅ Despliega sin downtime

---

## ⚠️ Importante sobre el Free Tier

### Spin-down automático
- Después de **15 minutos sin tráfico**, la app se "duerme"
- La primera request después del spin-down toma **30-60 segundos**
- Las siguientes son rápidas

### Mantener activa (opcional)
Si quieres evitar el spin-down, puedes usar un servicio de ping:
- [UptimeRobot](https://uptimerobot.com) (gratis, hace ping cada 5 min)
- [Cron-job.org](https://cron-job.org)

O simplemente acepta la primera carga lenta después de inactividad.

---

## 🐛 Troubleshooting

### Build falla
**Problema:** Error en `npm ci` o `prisma generate`

**Solución:**
- Verifica que `package-lock.json` esté sincronizado
- Revisa los logs de build en Render
- Asegúrate de que `npm run build` funcione localmente

### Error de base de datos
**Problema:** "Cannot find database file"

**Solución:**
- Verifica que el disco persistente esté montado en `/opt/render/project/data`
- Confirma que `DATABASE_URL=file:/opt/render/project/data/prod.db`
- Las migraciones deben ejecutarse en el build command

### Imágenes desaparecen
**Problema:** Las imágenes subidas se pierden tras deploy

**Solución 1 (Simple):** Guarda uploads en el mismo disco:
- Modifica la ruta de uploads para usar `/opt/render/project/data/uploads`

**Solución 2 (Avanzada):** Usa servicio externo como Cloudinary

### App se queda "Building" por siempre
**Problema:** El build no termina

**Solución:**
- Cancela el deploy
- Revisa que el build command sea correcto
- Verifica los logs para ver dónde se atasca

---

## 💡 Tips

1. **Primeros deploys son lentos** - Render instala todas las dependencias desde cero
2. **Deploys posteriores son más rápidos** - Usa caché
3. **Revisa los logs** - Son muy útiles para debugging
4. **Usa el Shell** - Para ejecutar comandos de Prisma en producción

---

## 📊 Límites del Free Tier

- ✅ **1 servicio web** gratis
- ✅ **750 horas/mes** (más que suficiente para 1 app)
- ✅ **100 GB de ancho de banda**
- ✅ **1 GB de disco persistente** incluido
- ⚠️ **Spin-down** tras 15 min de inactividad

---

## 🔐 Seguridad

Antes de usar en producción:
- [ ] Cambia `ADMIN_ACCESS_CODE` a algo muy seguro
- [ ] Considera agregar rate limiting
- [ ] Revisa los logs regularmente
- [ ] Haz backups del disco si tienes datos importantes

---

## 📚 Recursos

- [Documentación de Render](https://render.com/docs)
- [Node.js en Render](https://render.com/docs/deploy-node-express-app)
- [Discos persistentes](https://render.com/docs/disks)

---

¿Problemas? Revisa los logs del servicio o contacta al soporte de Render (responden rápido).
