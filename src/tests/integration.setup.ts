import * as dotenv from 'dotenv';
import { execSync } from 'child_process';
import { prisma } from '@/shared/utils/prisma';

dotenv.config({ path: '.env.test' });
console.log(process.env.DATABASE_URL);
beforeAll(() => {
  execSync('npx prisma migrate reset --force', {
    stdio: 'inherit',
    env: process.env,
  });
});

beforeEach(async () => {
  const tables = await prisma.$queryRawUnsafe<{ tablename: string }[]>(
    `SELECT tablename FROM pg_tables WHERE schemaname='public'`
  );

  // Disable transaction for TRUNCATE
  await prisma.$executeRawUnsafe('SET LOCAL statement_timeout = 0;');

  for (const { tablename } of tables) {
    await prisma.$executeRawUnsafe(
      // Use CONTINUE IDENTITY and commit immediately
      `TRUNCATE TABLE "public"."${tablename}" CONTINUE IDENTITY CASCADE; COMMIT; BEGIN;`
    );
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});
