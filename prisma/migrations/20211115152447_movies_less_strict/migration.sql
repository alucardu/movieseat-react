-- DropIndex
DROP INDEX "Movie_poster_path_key";

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "poster_path" DROP NOT NULL,
ALTER COLUMN "release_date" DROP NOT NULL,
ALTER COLUMN "backdrop_path" DROP NOT NULL,
ALTER COLUMN "runtime" DROP NOT NULL,
ALTER COLUMN "tagline" DROP NOT NULL,
ALTER COLUMN "overview" DROP NOT NULL;
