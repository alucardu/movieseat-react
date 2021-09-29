/*
  Warnings:

  - You are about to drop the `NotificaionsOnUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NotificaionsOnUsers" DROP CONSTRAINT "NotificaionsOnUsers_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "NotificaionsOnUsers" DROP CONSTRAINT "NotificaionsOnUsers_userId_fkey";

-- DropTable
DROP TABLE "NotificaionsOnUsers";

-- CreateTable
CREATE TABLE "NotificationsOnUsers" (
    "userId" INTEGER NOT NULL,
    "notificationId" INTEGER NOT NULL,
    "watched" BOOLEAN NOT NULL,

    PRIMARY KEY ("userId","notificationId")
);

-- AddForeignKey
ALTER TABLE "NotificationsOnUsers" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationsOnUsers" ADD FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
