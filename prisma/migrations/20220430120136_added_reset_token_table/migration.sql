/*
  Warnings:

  - You are about to drop the `_MovieRatingToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieToMovieRating` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[resetToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `MovieRating` required. This step will fail if there are existing NULL values in that column.
  - Made the column `movieId` on table `MovieRating` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MovieRating" DROP CONSTRAINT "MovieRating_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieRating" DROP CONSTRAINT "MovieRating_userId_fkey";

-- DropForeignKey
ALTER TABLE "_MovieRatingToUser" DROP CONSTRAINT "_MovieRatingToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieRatingToUser" DROP CONSTRAINT "_MovieRatingToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToMovieRating" DROP CONSTRAINT "_MovieToMovieRating_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToMovieRating" DROP CONSTRAINT "_MovieToMovieRating_B_fkey";

-- AlterTable
ALTER TABLE "MovieRating" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "movieId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetToken" TEXT;

-- DropTable
DROP TABLE "_MovieRatingToUser";

-- DropTable
DROP TABLE "_MovieToMovieRating";

-- CreateIndex
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");

-- AddForeignKey
ALTER TABLE "MovieRating" ADD CONSTRAINT "MovieRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieRating" ADD CONSTRAINT "MovieRating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
