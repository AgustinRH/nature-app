# 🌿 NatureApp - Gestión de Especies y Hábitats
### Proyecto Sustitutorio - Segundo Trimestre

NatureApp es una plataforma web desarrollada con **Astro.js** en modo SSR (Server-Side Rendering) que permite la catalogación de fauna, gestión de usuarios y administración de contenido multimedia. El proyecto aplica un patrón **MVC** (Modelo-Vista-Controlador) adaptado a la arquitectura de Astro.

## 🚀 Tecnologías Utilizadas
* **Framework:** Astro.js (Modo SSR con Adaptador de Node)
* **Lenguaje:** TypeScript
* **Motor de Plantillas:** Astro Components (archivos .astro)
* **Persistencia (ORM):** Prisma / Drizzle (SQLite/PostgreSQL)
* **Entorno:** Ubuntu vía WSL (Windows Subsystem for Linux)
* **Captura de Vídeo:** OBS Project

---

## 📋 Requisitos del Proyecto (Checklist)

A continuación se detallan los puntos solicitados por el profesor y su implementación:

- [ ] **Rutas estáticas:** Implementadas en la raíz y secciones informativas.
- [ ] **Rutas dinámicas:** Páginas de detalle para cada especie animal (`/animal/[id]`).
- [ ] **Controladores GET/POST:** Lógica de servidor en el frontmatter de los archivos `.astro` y endpoints de API.
- [ ] **Gestión de formularios HTML:** Procesamiento de datos de entrada para creación de registros.
- [ ] **Subida de archivos:** Sistema de carga de imágenes para la galería de animales.
- [ ] **Errores y redirecciones:** Manejo de páginas 404 y redirecciones de seguridad para usuarios no autenticados.
- [ ] **Motores de plantillas:** Uso intensivo de layouts, slots, variables y filtros de datos.
- [ ] **Persistencia con ORM:** Gestión de base de datos mediante Modelos, Migraciones y Consultas.
- [ ] **Sesiones:** Almacenamiento de estado de usuario en el servidor.
- [ ] **Auth (Registro/Login/Logout):** Sistema completo de autenticación.
- [ ] **Permisos y Control de Acceso:** Restricción de rutas administrativas (solo para usuarios registrados).
- [ ] **Cookies:** Implementación de preferencias de usuario y tokens de sesión.

---

## 🛠️ Instalación y Ejecución

1.  **Clonar el repositorio dentro de WSL:**
    ```bash
    git clone <tu-url-de-repositorio>
    cd nature-app
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar el ORM (Base de datos):**
    ```bash
    npx prisma migrate dev --name init
    ```

4.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

---

## 📂 Estructura de Carpetas (MVC)
- `src/pages/`: Vistas y Controladores (Rutas).
- `src/components/`: Componentes reutilizables (UI).
- `src/layouts/`: Plantillas base del sitio.
- `src/lib/`: Configuración del ORM y lógica de negocio (Modelos).
- `public/uploads/`: Almacenamiento local de archivos multimedia.