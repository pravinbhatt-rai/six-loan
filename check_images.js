const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const cards = await prisma.creditCardProduct.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
    },
    take: 10,
  });
  
  console.log('Credit Card Image URLs:');
  cards.forEach(card => {
    console.log(`${card.id}: ${card.name} -> ${card.imageUrl}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
