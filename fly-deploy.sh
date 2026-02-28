#!/bin/bash
# Script de ayuda para deploy en Fly.io

set -e

echo "🚀 Script de Deploy para Fly.io"
echo "================================"
echo ""

# Verificar si flyctl está instalado
if ! command -v flyctl &> /dev/null; then
    echo "❌ Fly CLI no está instalado."
    echo "📥 Instala con: curl -L https://fly.io/install.sh | sh"
    exit 1
fi

echo "✅ Fly CLI detectado"
echo ""

# Verificar si está logueado
if ! flyctl auth whoami &> /dev/null; then
    echo "🔐 No estás logueado. Iniciando login..."
    flyctl auth login
fi

echo "✅ Autenticado en Fly.io"
echo ""

# Menú de opciones
echo "Selecciona una opción:"
echo "1) 🆕 Crear nueva app (primera vez)"
echo "2) 📦 Desplegar app existente"
echo "3) 📊 Ver logs"
echo "4) 🌐 Abrir app en navegador"
echo "5) ℹ️  Ver status"
echo ""
read -p "Opción (1-5): " option

case $option in
    1)
        echo "🆕 Creando nueva app..."
        flyctl launch --no-deploy
        echo ""
        echo "📝 Ahora configura los secrets:"
        read -p "ADMIN_ACCESS_CODE (tu código secreto): " admin_code
        flyctl secrets set ADMIN_ACCESS_CODE="$admin_code"
        flyctl secrets set DATABASE_URL="file:/app/data/prod.db"
        flyctl secrets set NODE_ENV="production"
        echo ""
        echo "💾 Creando volumen persistente..."
        read -p "Región (ej: mad, fra, lhr): " region
        flyctl volumes create nature_app_data --size 1 --region "$region"
        echo ""
        echo "🚀 Desplegando..."
        flyctl deploy
        echo ""
        echo "✅ ¡Deploy completado!"
        flyctl open
        ;;
    2)
        echo "📦 Desplegando..."
        flyctl deploy
        echo ""
        echo "✅ Deploy completado!"
        ;;
    3)
        echo "📊 Mostrando logs (Ctrl+C para salir)..."
        flyctl logs
        ;;
    4)
        echo "🌐 Abriendo en navegador..."
        flyctl open
        ;;
    5)
        echo "ℹ️  Status de la app:"
        flyctl status
        ;;
    *)
        echo "❌ Opción inválida"
        exit 1
        ;;
esac
