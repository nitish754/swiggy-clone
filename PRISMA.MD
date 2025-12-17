## How to setup Prisma with Express + Typescript

## Follow the below clear and simple setups to configure PRISMA client in your Project 

1. # install dependencies: 
npm install prisma @types/node @types/pg --save-dev 
npm install @prisma/client @prisma/adapter-pg pg dotenv

2. # Initiate prisma to create and schema and config for primsma 
npx prisma init (it will create folder prisma/schema.prisma)
prisma.config.ts (where all the config is placed)

3. # change your url inside .env file (DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public")

4. # Define your table schema inside prisma/schema.prisma file 

5. # create the migration for your databse (npx prisma migrate dev --name (YOUR_SCHEMA_NAME) init)
NOTE : SCHEMA NAME IS OPITON . IF YOU PUT THEN IT WILL CREATE WITH THAT NAME OTHER WISE PRISMA CHOOSE THE RANDOM ONE 