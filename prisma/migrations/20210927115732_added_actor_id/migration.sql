/*
  Warnings:

  - Added the required column `actor_id` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "actor_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("actor_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
