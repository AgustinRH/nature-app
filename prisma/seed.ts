import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Empezando el sembrado de datos...');

  // 1. Opcional: Limpiar la base de datos antes de sembrar
  await prisma.animal.deleteMany();

  const nombresAnimales = [
    'Lince Ibérico', 'Oso Pardo', 'Águila Imperial', 'Lobo Ibérico', 'Quebrantahuesos',
    'Cigüeña Negra', 'Buitre Leonado', 'Foca Monje', 'Tortuga Boba', 'Urogallo Cantábrico',
    'Lutra lutra', 'Gato Montés', 'Jineta', 'Tejón', 'Zorro Rojo',
    'Ciervo Volante', 'Cuchara Común', 'Flamenco Rosa', 'Avutarda', 'Milano Real'
  ];

  const habitats = ['Doñana', 'Picos de Europa', 'Sierra Nevada', 'Delta del Ebro', 'Pirineos', 'Monfragüe'];
  const riesgos = ['Seguro', 'Vulnerable', 'En Peligro', 'Crítico'];

  const especiesData = [];

  for (let i = 1; i <= 50; i++) {
    const nombreBase = nombresAnimales[i % nombresAnimales.length];
    
    especiesData.push({
      nombre: `${nombreBase} #${i}`,
      especie: `${nombreBase.split(' ')[0]} scientificus`,
      habitat: habitats[Math.floor(Math.random() * habitats.length)],
      riesgo: riesgos[Math.floor(Math.random() * riesgos.length)],
      descripcion: `Esta es la especie número ${i}. Es un ejemplar fascinante que habita en zonas protegidas y requiere monitoreo constante para su conservación.`,
      // Usamos una imagen de placeholder de alta calidad para que la web se vea bien
      imagenUrl: `https://picsum.photos/seed/${i + 123}/600/400`, 
    });
  }

  // 2. Inserción masiva
  await prisma.animal.createMany({
    data: especiesData,
  });

  console.log('✅ ¡Se han creado 50 especies con éxito!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });