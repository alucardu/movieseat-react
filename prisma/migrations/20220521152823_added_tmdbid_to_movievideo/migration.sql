/*
  Warnings:

  - Added the required column `tmdb_id` to the `MovieVideo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovieVideo" ADD COLUMN     "tmdb_id" INTEGER NOT NULL;
