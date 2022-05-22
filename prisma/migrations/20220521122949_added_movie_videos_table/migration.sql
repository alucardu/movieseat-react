-- CreateTable
CREATE TABLE "MovieVideo" (
    "id" SERIAL NOT NULL,
    "iso_639_1" TEXT NOT NULL,
    "iso_3166_1" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "official" BOOLEAN NOT NULL,
    "published_at" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "MovieVideo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MovieVideo" ADD CONSTRAINT "MovieVideo_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
