/*
  Warnings:

  - You are about to drop the column `release_data` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `release_date` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "release_data",
ADD COLUMN     "release_date" TEXT NOT NULL;
