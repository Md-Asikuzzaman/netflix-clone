import { PrismaClient } from '@prisma/client';

declare global {
  namespace globalThis {
    var prisma_db: PrismaClient;
  }
}
