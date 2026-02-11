// Temporarily disabled - Prisma 7 requires different configuration
// For now, we'll use a mock implementation

export const prisma = {
  user: {
    findUnique: async () => null,
    create: async (data: any) => data.data,
  },
  venue: {
    findMany: async () => [],
    findUnique: async () => null,
  },
  order: {
    findMany: async () => [],
    create: async (data: any) => data.data,
  },
  weddingSite: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async (data: any) => data.data,
  },
};

// Uncomment when database is configured:
// import { PrismaClient } from '@prisma/client';
// const globalForPrisma = global as unknown as { prisma: PrismaClient };
// export const prisma = globalForPrisma.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
