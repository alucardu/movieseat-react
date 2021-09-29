/*
  Warnings:

  - You are about to drop the column `actor_id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `movie_id` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `followedUserId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_actor_id_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "actor_id",
DROP COLUMN "movie_id",
ADD COLUMN     "followedUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("followedUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
