/*
  Warnings:

  - You are about to drop the `_MovieToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MovieToUser" DROP CONSTRAINT "_MovieToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToUser" DROP CONSTRAINT "_MovieToUser_B_fkey";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
CREATE SEQUENCE "user_id_seq";
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE "user_id_seq" OWNED BY "User"."id";

-- DropTable
DROP TABLE "_MovieToUser";

-- CreateTable
CREATE TABLE "_UserAddedMovies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserAddedMovies_AB_unique" ON "_UserAddedMovies"("A", "B");

-- CreateIndex
CREATE INDEX "_UserAddedMovies_B_index" ON "_UserAddedMovies"("B");

-- AddForeignKey
ALTER TABLE "Movie" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAddedMovies" ADD FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAddedMovies" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
