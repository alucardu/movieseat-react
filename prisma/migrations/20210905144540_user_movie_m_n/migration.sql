/*
  Warnings:

  - You are about to drop the column `userId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the `_UserAddedMovies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_userId_fkey";

-- DropForeignKey
ALTER TABLE "_UserAddedMovies" DROP CONSTRAINT "_UserAddedMovies_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserAddedMovies" DROP CONSTRAINT "_UserAddedMovies_B_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "userId";

-- DropTable
DROP TABLE "_UserAddedMovies";

-- CreateTable
CREATE TABLE "_MovieToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToUser_AB_unique" ON "_MovieToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToUser_B_index" ON "_MovieToUser"("B");

-- AddForeignKey
ALTER TABLE "_MovieToUser" ADD FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
