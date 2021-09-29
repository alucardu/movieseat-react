/*
  Warnings:

  - You are about to drop the column `actor_id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the `NotificationsOnUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `watched` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NotificationsOnUsers" DROP CONSTRAINT "NotificationsOnUsers_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationsOnUsers" DROP CONSTRAINT "NotificationsOnUsers_userId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "actor_id",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "watched" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "NotificationsOnUsers";

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
