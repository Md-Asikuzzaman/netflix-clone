import { PrismaClient } from '@prisma/client';

const client = global.prisma_db || new PrismaClient();
if (process.env.NODE_ENV === 'production') global.prisma_db = client;

export default client;
