/*
  Warnings:

  - A unique constraint covering the columns `[original_title]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[poster_path]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "poster_path" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Movie.original_title_unique" ON "Movie"("original_title");

-- CreateIndex
CREATE UNIQUE INDEX "Movie.poster_path_unique" ON "Movie"("poster_path");

-- CreateIndex
CREATE UNIQUE INDEX "User.user_name_unique" ON "User"("user_name");
