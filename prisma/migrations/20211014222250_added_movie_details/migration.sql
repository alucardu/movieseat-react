/*
  Warnings:

  - A unique constraint covering the columns `[backdrop_path]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tagline]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `backdrop_path` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runtime` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagline` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "backdrop_path" TEXT NOT NULL,
ADD COLUMN     "runtime" INTEGER NOT NULL,
ADD COLUMN     "tagline" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Movie_backdrop_path_key" ON "Movie"("backdrop_path");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_tagline_key" ON "Movie"("tagline");
