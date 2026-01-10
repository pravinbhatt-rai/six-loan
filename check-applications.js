const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkApplications() {
  try {
    const user = await prisma.user.findUnique({
      where: { id: 7 },
      select: { id: true, name: true, email: true, phone: true }
    });
    console.log('\n=== User Info ===');
    console.log(user);
    
    const applications = await prisma.application.findMany({
      where: { userId: 7 },
      select: {
        id: true,
        referenceNo: true,
        type: true,
        status: true,
        userId: true,
        email: true,
        phone: true,
        applicantName: true,
        createdAt: true
      }
    });
    console.log('\n=== Applications for userId 7 ===');
    console.log('Count:', applications.length);
    console.log(JSON.stringify(applications, null, 2));
    
    const allApps = await prisma.application.findMany({
      select: {
        id: true,
        userId: true,
        email: true,
        phone: true,
        applicantName: true,
        referenceNo: true,
        type: true
      },
      take: 10,
      orderBy: { createdAt: 'desc' }
    });
    console.log('\n=== All Recent Applications (first 10) ===');
    console.log('Count:', allApps.length);
    console.log(JSON.stringify(allApps, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkApplications();
