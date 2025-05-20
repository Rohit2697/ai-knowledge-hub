integrate with Prisma client 
1. npm install prisma
2. npx prisma init --datasource-provider sqlite
3. define model
ex: prisma\schema.prisma
model Post {
  id          Int    @id @default(autoincrement())
  slug        String
  title       String
  description String
  content     String
  tags        String
  author      String
  date        String
  readingTime String
  coverImage  String
}

4. npx prisma migrate dev
