import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

declare global {
  // eslint-disable-next-line no-var
  var prisma: ReturnType<typeof createPrismaClient> | undefined;
}

function createPrismaClient() {
  // Prisma 7 with Accelerate: Must provide accelerateUrl in constructor
  const client = new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL,
  } as any);
  return client.$extends(withAccelerate());
}

// Prevent multiple Prisma instances in development (hot reload)
export const prisma = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
