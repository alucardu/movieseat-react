/*
  Warnings:

  - Added the required column `release_data` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "release_data" TEXT NOT NULL;
