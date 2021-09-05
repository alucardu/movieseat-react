/*
  Warnings:

  - A unique constraint covering the columns `[tmdb_id]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movie.tmdb_id_unique" ON "Movie"("tmdb_id");
