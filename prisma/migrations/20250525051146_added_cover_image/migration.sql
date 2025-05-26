/*
  Warnings:

  - You are about to alter the column `coverImage` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `String` to `Binary`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "readingTime" TEXT NOT NULL,
    "coverImage" BLOB NOT NULL
);
INSERT INTO "new_Post" ("author", "content", "coverImage", "date", "description", "id", "readingTime", "slug", "tags", "title") SELECT "author", "content", "coverImage", "date", "description", "id", "readingTime", "slug", "tags", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
