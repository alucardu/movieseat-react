-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tmdb_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
