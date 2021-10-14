/*
  Warnings:

  - A unique constraint covering the columns `[overview]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `overview` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "overview" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Movie_overview_key" ON "Movie"("overview");
