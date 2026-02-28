# ✅ Checklist Pre-Deploy

Antes de hacer tu primer deploy, verifica estos puntos:

## 🔐 Seguridad
- [ ] Cambia `ADMIN_ACCESS_CODE` en `.env` a un valor más seguro
- [ ] Verifica que `.env` esté en `.gitignore` 
- [ ] Asegúrate de NO haber commiteado `.env` al repositorio
- [ ] Revisa que no haya contraseñas hardcodeadas en el código

## 📁 Archivos de configuración
- [ ] `package.json` tiene script `"start"` configurado
- [ ] `prisma` está en `dependencies` (no solo en `devDependencies`)
- [ ] Existe `railway.json` con la configuración correcta
- [ ] Existe `nixpacks.toml` con los comandos de build
- [ ] `.env.example` está documentado para otros desarrolladores

## 🗄️ Base de datos
- [ ] Las migraciones en `prisma/migrations/` están commiteadas
- [ ] El seed en `prisma/seed.ts` funciona correctamente
- [ ] Has probado `npx prisma migrate deploy` localmente

## 🔨 Build local
Prueba que el proyecto se construya correctamente:

```bash
# 1. Limpia node_modules y dist
rm -rf node_modules dist .astro

# 2. Reinstala dependencias (simula CI)
npm ci

# 3. Genera Prisma client
npx prisma generate

# 4. Construye el proyecto
npm run build

# 5. Prueba en modo producción
npm run start
```

Si todo funciona sin errores, estás listo para deploy!

## 📤 Git
- [ ] Todos los cambios están commiteados
- [ ] Has hecho push al repositorio remoto
- [ ] La rama principal es `main` o `master`

## 🚀 Railway (al momento del deploy)
- [ ] Variables de entorno configuradas
- [ ] Volumen para `/app/prisma` creado
- [ ] Volumen para `/app/public/uploads` creado
- [ ] Dominio generado y funcionando

## ✨ Post-Deploy
- [ ] La aplicación carga correctamente
- [ ] Puedes registrarte y hacer login
- [ ] El código de admin funciona
- [ ] Las imágenes se suben correctamente
- [ ] Puedes crear y editar animales/plantas

---

**Tip:** Guarda este checklist para futuros deploys o cuando hagas cambios importantes.
