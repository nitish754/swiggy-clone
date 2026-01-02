# Setting up Prisma with Express + TypeScript

Follow these steps to set up Prisma in your Express + TypeScript project:

## 1. Install Prisma CLI

Run the following command to install Prisma CLI as a development dependency:

```bash
npm install -D prisma
```

## 2. Initialize Prisma

After installing Prisma, initialize it by running:

```bash
npx prisma init
```

This will create a `prisma` folder with the following files:

### `schema.prisma`

```prisma
generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "postgresql"
}
```

### `prisma.config.ts`

Create a `prisma.config.ts` file with the following content:

````typescript
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL'],
  },
});
## 3. Install Prisma Client

Run the following command to install the Prisma Client, which is used to connect to your database from your application:

```bash
npm install @prisma/client
````

## 4. Generate Prisma Client

After installing the Prisma Client, generate it by running:

```bash
npx prisma generate
```

This command will generate the `PrismaClient` to connect with your database.

## 5. Create a Prisma Connection File

Create a connection file at `src/shared/utils/prisma.ts` with the following content:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```

## 6. Run Migrations

To apply your schema changes to the database, run the following command:

```bash
npx prisma migrate dev --name MySchema init
```

After making any changes to your schema, you need to run this command again to reflect the changes in your database.

Your Prisma configuration is now complete. You can use the `PrismaClient` instance throughout your application to interact with your database models.
