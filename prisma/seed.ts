import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Empezando el sembrado de datos...');

  // 1. Limpiar la base de datos antes de sembrar
  await prisma.animal.deleteMany();
  await prisma.planta.deleteMany();

  // URLs confiables usando picsum.photos
  const animalesConImagenes = [
    { nombre: 'Lince Ibérico', especie: 'Lynx pardinus', imagen: 'https://picsum.photos/600/400?random=1' },
    { nombre: 'Oso Pardo', especie: 'Ursus arctos', imagen: 'https://picsum.photos/600/400?random=2' },
    { nombre: 'Águila Imperial', especie: 'Aquila adalberti', imagen: 'https://picsum.photos/600/400?random=3' },
    { nombre: 'Lobo Ibérico', especie: 'Canis lupus', imagen: 'https://picsum.photos/600/400?random=4' },
    { nombre: 'Quebrantahuesos', especie: 'Gypaetus barbatus', imagen: 'https://picsum.photos/600/400?random=5' },
    { nombre: 'Cigüeña Negra', especie: 'Ciconia nigra', imagen: 'https://picsum.photos/600/400?random=6' },
    { nombre: 'Buitre Leonado', especie: 'Gyps fulvus', imagen: 'https://picsum.photos/600/400?random=7' },
    { nombre: 'Foca Monje', especie: 'Monachus monachus', imagen: 'https://picsum.photos/600/400?random=8' },
    { nombre: 'Tortuga Boba', especie: 'Caretta caretta', imagen: 'https://picsum.photos/600/400?random=9' },
    { nombre: 'Lución', especie: 'Anguis fragilis', imagen: 'https://picsum.photos/600/400?random=10' },
    { nombre: 'Nutria', especie: 'Lutra lutra', imagen: 'https://picsum.photos/600/400?random=11' },
    { nombre: 'Gato Montés', especie: 'Felis silvestris', imagen: 'https://picsum.photos/600/400?random=12' },
    { nombre: 'Jineta', especie: 'Genetta genetta', imagen: 'https://picsum.photos/600/400?random=13' },
    { nombre: 'Tejón', especie: 'Meles meles', imagen: 'https://picsum.photos/600/400?random=14' },
    { nombre: 'Zorro Rojo', especie: 'Vulpes vulpes', imagen: 'https://picsum.photos/600/400?random=15' },
    { nombre: 'Ciervo Volante', especie: 'Lucanus cervus', imagen: 'https://picsum.photos/600/400?random=16' },
    { nombre: 'Pato Rabudo', especie: 'Anas acuta', imagen: 'https://picsum.photos/600/400?random=17' },
    { nombre: 'Flamenco Rosa', especie: 'Phoenicopterus roseus', imagen: 'https://picsum.photos/600/400?random=18' },
    { nombre: 'Gavilán', especie: 'Accipiter nisus', imagen: 'https://picsum.photos/600/400?random=19' },
    { nombre: 'Milano Real', especie: 'Milvus milvus', imagen: 'https://picsum.photos/600/400?random=20' },
    { nombre: 'Gamo Común', especie: 'Dama dama', imagen: 'https://picsum.photos/600/400?random=21' },
    { nombre: 'Jabalí', especie: 'Sus scrofa', imagen: 'https://picsum.photos/600/400?random=22' },
    { nombre: 'Corzo', especie: 'Capreolus capreolus', imagen: 'https://picsum.photos/600/400?random=23' },
    { nombre: 'Sapo Común', especie: 'Bufo bufo', imagen: 'https://picsum.photos/600/400?random=24' },
    { nombre: 'Rana Verde', especie: 'Rana perezi', imagen: 'https://picsum.photos/600/400?random=25' },
    { nombre: 'Culebra de Agua', especie: 'Natrix natrix', imagen: 'https://picsum.photos/600/400?random=26' },
    { nombre: 'Eslizón', especie: 'Chalcides ocellatus', imagen: 'https://picsum.photos/600/400?random=27' },
    { nombre: 'Víbora', especie: 'Vipera latastei', imagen: 'https://picsum.photos/600/400?random=28' },
    { nombre: 'Lagartija Ibérica', especie: 'Podarcis hispanica', imagen: 'https://picsum.photos/600/400?random=29' },
    { nombre: 'Camaleón', especie: 'Chamaeleo chamaeleon', imagen: 'https://picsum.photos/600/400?random=30' },
    { nombre: 'Murciélago Común', especie: 'Myotis myotis', imagen: 'https://picsum.photos/600/400?random=31' },
    { nombre: 'Erizo Europeo', especie: 'Erinaceus europaeus', imagen: 'https://picsum.photos/600/400?random=32' },
    { nombre: 'Musaraña', especie: 'Sorex araneus', imagen: 'https://picsum.photos/600/400?random=33' },
    { nombre: 'Rata de Agua', especie: 'Arvicola amphibius', imagen: 'https://picsum.photos/600/400?random=34' },
    { nombre: 'Ardilla Roja', especie: 'Sciurus vulgaris', imagen: 'https://picsum.photos/600/400?random=35' },
    { nombre: 'Conejo Silvestre', especie: 'Oryctolagus cuniculus', imagen: 'https://picsum.photos/600/400?random=36' },
    { nombre: 'Liebre Ibérica', especie: 'Lepus castroviejoi', imagen: 'https://picsum.photos/600/400?random=37' },
    { nombre: 'Topillo', especie: 'Microtus arvalis', imagen: 'https://picsum.photos/600/400?random=38' },
    { nombre: 'Gineta', especie: 'Genetta genetta', imagen: 'https://picsum.photos/600/400?random=39' },
    { nombre: 'Meloncillo', especie: 'Herpestes ichneumon', imagen: 'https://picsum.photos/600/400?random=40' },
  ];

  // URLs confiables usando picsum.photos para plantas
  const plantasConImagenes = [
    { nombre: 'Pino Silvestre', especie: 'Pinus sylvestris', imagen: 'https://picsum.photos/600/400?random=41' },
    { nombre: 'Encina', especie: 'Quercus ilex', imagen: 'https://picsum.photos/600/400?random=42' },
    { nombre: 'Alcornoque', especie: 'Quercus suber', imagen: 'https://picsum.photos/600/400?random=43' },
    { nombre: 'Roble Melojo', especie: 'Quercus pyrenaica', imagen: 'https://picsum.photos/600/400?random=44' },
    { nombre: 'Haya Común', especie: 'Fagus sylvatica', imagen: 'https://picsum.photos/600/400?random=45' },
    { nombre: 'Abeto Blanco', especie: 'Abies alba', imagen: 'https://picsum.photos/600/400?random=46' },
    { nombre: 'Castaño', especie: 'Castanea sativa', imagen: 'https://picsum.photos/600/400?random=47' },
    { nombre: 'Ciprés Común', especie: 'Cupressus sempervirens', imagen: 'https://picsum.photos/600/400?random=48' },
    { nombre: 'Fresno Común', especie: 'Fraxinus excelsior', imagen: 'https://picsum.photos/600/400?random=49' },
    { nombre: 'Olmo de Montaña', especie: 'Ulmus glabra', imagen: 'https://picsum.photos/600/400?random=50' },
    { nombre: 'Tejo Ibérico', especie: 'Taxus baccata', imagen: 'https://picsum.photos/600/400?random=51' },
    { nombre: 'Acebo Común', especie: 'Ilex aquifolium', imagen: 'https://picsum.photos/600/400?random=52' },
    { nombre: 'Boj', especie: 'Buxus sempervirens', imagen: 'https://picsum.photos/600/400?random=53' },
    { nombre: 'Madroño', especie: 'Arbutus unedo', imagen: 'https://picsum.photos/600/400?random=54' },
    { nombre: 'Mirto', especie: 'Myrtus communis', imagen: 'https://picsum.photos/600/400?random=55' },
    { nombre: 'Laurel Nobilis', especie: 'Laurus nobilis', imagen: 'https://picsum.photos/600/400?random=56' },
    { nombre: 'Sabina Albar', especie: 'Juniperus thurifera', imagen: 'https://picsum.photos/600/400?random=57' },
    { nombre: 'Picea', especie: 'Picea abies', imagen: 'https://picsum.photos/600/400?random=58' },
    { nombre: 'Nogal Común', especie: 'Juglans regia', imagen: 'https://picsum.photos/600/400?random=59' },
    { nombre: 'Plátano Mayor', especie: 'Platanus occidentalis', imagen: 'https://picsum.photos/600/400?random=60' },
    { nombre: 'Sauce Blanco', especie: 'Salix alba', imagen: 'https://picsum.photos/600/400?random=61' },
    { nombre: 'Álamo Blanco', especie: 'Populus alba', imagen: 'https://picsum.photos/600/400?random=62' },
    { nombre: 'Abedul', especie: 'Betula pendula', imagen: 'https://picsum.photos/600/400?random=63' },
    { nombre: 'Avellano', especie: 'Corylus avellana', imagen: 'https://picsum.photos/600/400?random=64' },
    { nombre: 'Algarrobo', especie: 'Ceratonia siliqua', imagen: 'https://picsum.photos/600/400?random=65' },
    { nombre: 'Rosa Silvestre', especie: 'Rosa canina', imagen: 'https://picsum.photos/600/400?random=66' },
    { nombre: 'Margarita', especie: 'Bellis perennis', imagen: 'https://picsum.photos/600/400?random=67' },
    { nombre: 'Lirio Amarillo', especie: 'Iris pseudacorus', imagen: 'https://picsum.photos/600/400?random=68' },
    { nombre: 'Narciso', especie: 'Narcissus pseudonarcissus', imagen: 'https://picsum.photos/600/400?random=69' },
    { nombre: 'Amapola', especie: 'Papaver rhoeas', imagen: 'https://picsum.photos/600/400?random=70' },
    { nombre: 'Jacinto', especie: 'Hyacinthus orientalis', imagen: 'https://picsum.photos/600/400?random=71' },
    { nombre: 'Girasol', especie: 'Helianthus annuus', imagen: 'https://picsum.photos/600/400?random=72' },
    { nombre: 'Tulipán', especie: 'Tulipa gesneriana', imagen: 'https://picsum.photos/600/400?random=73' },
    { nombre: 'Azucena', especie: 'Lilium candidum', imagen: 'https://picsum.photos/600/400?random=74' },
    { nombre: 'Orquídea', especie: 'Orchidaceae', imagen: 'https://picsum.photos/600/400?random=75' },
    { nombre: 'Limonero', especie: 'Citrus limon', imagen: 'https://picsum.photos/600/400?random=76' },
    { nombre: 'Naranjo', especie: 'Citrus sinensis', imagen: 'https://picsum.photos/600/400?random=77' },
    { nombre: 'Granado', especie: 'Punica granatum', imagen: 'https://picsum.photos/600/400?random=78' },
    { nombre: 'Azafrán', especie: 'Crocus sativus', imagen: 'https://picsum.photos/600/400?random=79' },
    { nombre: 'Clavel', especie: 'Dianthus caryophyllus', imagen: 'https://picsum.photos/600/400?random=80' },
  ];

  const habitats = ['Doñana', 'Picos de Europa', 'Sierra Nevada', 'Delta del Ebro', 'Pirineos', 'Monfragüe', 'Bosque Amazónico', 'Litoral Mediterráneo', 'Montaña'];
  const riesgos = ['Seguro', 'Vulnerable', 'En Peligro', 'Crítico'];

  const especiesAnimalesData = [];
  const especiesPlantsData = [];

  // 2. Generar 50 animales
  for (let i = 1; i <= 50; i++) {
    const animalBase = animalesConImagenes[i % animalesConImagenes.length];
    
    especiesAnimalesData.push({
      nombre: animalBase.nombre,
      especie: animalBase.especie,
      habitat: habitats[Math.floor(Math.random() * habitats.length)],
      riesgo: riesgos[Math.floor(Math.random() * riesgos.length)],
      descripcion: `Esta es la especie número ${i}. Es un ejemplar fascinante que habita en zonas protegidas y requiere monitoreo constante para su conservación. El ${animalBase.nombre} es una especie importante para el ecosistema local.`,
      imagenUrl: animalBase.imagen, 
    });
  }

  // 3. Generar 50 plantas
  for (let i = 1; i <= 50; i++) {
    const plantaBase = plantasConImagenes[i % plantasConImagenes.length];
    
    especiesPlantsData.push({
      nombre: plantaBase.nombre,
      especie: plantaBase.especie,
      habitat: habitats[Math.floor(Math.random() * habitats.length)],
      riesgo: riesgos[Math.floor(Math.random() * riesgos.length)],
      descripcion: `Esta es la especie vegetal número ${i}. Es una planta fascinante que habita en ecosistemas protegidos y es vital para la biodiversidad local. El ${plantaBase.nombre} juega un papel crucial en su hábitat.`,
      imagenUrl: plantaBase.imagen, 
    });
  }

  // 4. Inserción masiva de animales
  await prisma.animal.createMany({
    data: especiesAnimalesData,
  });

  // 5. Inserción masiva de plantas
  await prisma.planta.createMany({
    data: especiesPlantsData,
  });

  console.log('✅ ¡Se han creado 50 animales y 50 plantas con imágenes reales!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });