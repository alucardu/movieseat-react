-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "movieRatingId" INTEGER;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_movieRatingId_fkey" FOREIGN KEY ("movieRatingId") REFERENCES "MovieRating"("id") ON DELETE SET NULL ON UPDATE CASCADE;
