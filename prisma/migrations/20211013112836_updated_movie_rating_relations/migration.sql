/*
  Warnings:

  - Made the column `userId` on table `MovieRating` required. This step will fail if there are existing NULL values in that column.
  - Made the column `movieId` on table `MovieRating` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MovieRating" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "movieId" SET NOT NULL;
