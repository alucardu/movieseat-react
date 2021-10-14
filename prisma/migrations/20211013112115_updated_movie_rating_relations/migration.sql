-- DropForeignKey
ALTER TABLE "MovieRating" DROP CONSTRAINT "MovieRating_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieRating" DROP CONSTRAINT "MovieRating_userId_fkey";

-- DropIndex
DROP INDEX "MovieRating_movieId_unique";

-- DropIndex
DROP INDEX "MovieRating_userId_unique";

-- CreateTable
CREATE TABLE "_MovieToMovieRating" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MovieRatingToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToMovieRating_AB_unique" ON "_MovieToMovieRating"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToMovieRating_B_index" ON "_MovieToMovieRating"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieRatingToUser_AB_unique" ON "_MovieRatingToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieRatingToUser_B_index" ON "_MovieRatingToUser"("B");

-- AddForeignKey
ALTER TABLE "MovieRating" ADD CONSTRAINT "MovieRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieRating" ADD CONSTRAINT "MovieRating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToMovieRating" ADD FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToMovieRating" ADD FOREIGN KEY ("B") REFERENCES "MovieRating"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieRatingToUser" ADD FOREIGN KEY ("A") REFERENCES "MovieRating"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieRatingToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
