-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "followedUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_followedUserId_fkey" FOREIGN KEY ("followedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
