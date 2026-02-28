# 🚀 Deploy en Fly.io - Guía Completa

Esta guía te llevará paso a paso para desplegar NatureApp en Fly.io.

## 📋 Pre-requisitos

- Cuenta en [Fly.io](https://fly.io) (gratuita)
- Tarjeta de crédito (no se cobra en el free tier, pero la piden para verificación)
- Git instalado y código en GitHub

---

## 🛠️ Paso 1: Instalar Fly CLI

### En Linux/WSL:
```bash
curl -L https://fly.io/install.sh | sh
```

### En macOS:
```bash
brew install flyctl
```

### En Windows (PowerShell):
```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

Después de instalar, verifica:
```bash
flyctl version
```

---

## 🔐 Paso 2: Autenticación

Inicia sesión en Fly.io:

```bash
flyctl auth login
```

Esto abrirá tu navegador para que inicies sesión (o crees una cuenta).

---

## 🎯 Paso 3: Crear la app en Fly.io

**IMPORTANTE:** Antes de hacer `fly launch`, asegúrate de estar en el directorio del proyecto.

```bash
cd /home/agustin/nature-app
flyctl launch
```

Durante el proceso interactivo:
1. **App Name:** Acepta el sugerido o escribe uno personalizado (ej: `nature-app-tu-nombre`)
2. **Region:** Elige la más cercana a ti (ej: `mad` para Madrid, `fra` para Frankfurt)
3. **¿Desplegar ahora?** → Escribe **"No"** (necesitamos configurar primero)

Esto creará/actualizará el archivo `fly.toml`.

---

## 💾 Paso 4: Crear volumen persistente

Para que SQLite y las imágenes persistan:

```bash
flyctl volumes create nature_app_data --size 1 --region mad
```

*(Cambia `mad` por la región que elegiste)*

---

## 🔧 Paso 5: Configurar variables de entorno

Configura las variables secretas:

```bash
flyctl secrets set ADMIN_ACCESS_CODE="tu_codigo_super_secreto"
flyctl secrets set DATABASE_URL="file:/app/data/prod.db"
flyctl secrets set NODE_ENV="production"
```

Verifica que se guardaron:
```bash
flyctl secrets list
```

---

## 📦 Paso 6: Actualizar configuración de uploads

Necesitamos cambiar la ruta de uploads para usar el volumen persistente.

Edita el archivo donde se guarden las imágenes para usar `/app/data/uploads` en lugar de `public/uploads` cuando estés en producción.

O simplemente mantén `public/uploads` y crea un symlink en el Dockerfile (ya incluido).

---

## 🚀 Paso 7: Desplegar

Ahora sí, despliega la aplicación:

```bash
flyctl deploy
```

Esto hará:
1. ✅ Construir la imagen Docker
2. ✅ Subirla a Fly.io
3. ✅ Ejecutar las migraciones de Prisma
4. ✅ Iniciar la aplicación

El proceso toma 2-5 minutos.

---

## 🌐 Paso 8: Obtener la URL

Tu app estará disponible en:
```
https://tu-app-name.fly.dev
```

Para abrir directamente:
```bash
flyctl open
```

---

## 🔍 Comandos útiles

### Ver logs en tiempo real:
```bash
flyctl logs
```

### Ver status de la app:
```bash
flyctl status
```

### Conectar por SSH a la instancia:
```bash
flyctl ssh console
```

### Ejecutar comandos remotos:
```bash
# Ver la base de datos con Prisma Studio (localmente conectado)
flyctl proxy 5555:5555
# En otra terminal:
npx prisma studio

# Ejecutar seed en producción
flyctl ssh console -C "cd /app && npx prisma db seed"
```

### Ver uso de recursos:
```bash
flyctl dashboard
```

### Escalar recursos (si necesitas más):
```bash
flyctl scale memory 512  # Aumentar RAM
flyctl scale count 2     # Más instancias
```

---

## 🐛 Troubleshooting

### La app no inicia:
```bash
flyctl logs
```
Busca errores de Prisma, Node.js o falta de variables de entorno.

### Error de base de datos:
Verifica que:
- El volumen esté montado: `flyctl volumes list`
- `DATABASE_URL` apunte a `/app/data/prod.db`
- Las migraciones se ejecutaron: Revisa logs del deploy

### Imágenes desaparecen:
Asegúrate de que las imágenes se guarden en `/app/data/uploads` o en una ruta dentro del volumen montado.

### Build falla:
Revisa el Dockerfile y asegúrate de que `npm run build` funcione localmente.

---

## 💰 Costos del Free Tier

Fly.io ofrece gratis:
- **3 VMs compartidas** (256MB RAM cada una)
- **3GB de volumen persistente** total
- **160GB de transferencia** al mes

Para esta app, el free tier es más que suficiente.

---

## 🔄 Actualizar la app

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de cambios"
git push

# Luego deploy:
flyctl deploy
```

---

## 🔐 Seguridad en producción

Antes de usar en producción real:
- [ ] Cambia `ADMIN_ACCESS_CODE` a algo muy seguro
- [ ] Revisa los permisos de archivos
- [ ] Considera agregar rate limiting
- [ ] Habilita backups del volumen: `flyctl volumes snapshots`

---

## 📚 Recursos

- [Documentación de Fly.io](https://fly.io/docs/)
- [Fly.io con SQLite](https://fly.io/docs/litefs/speedrun/)
- [Dockerfile best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

---

¿Problemas? Ejecuta `flyctl doctor` para diagnóstico automático.
