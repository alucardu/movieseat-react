/*
  Warnings:

  - Changed the type of `actor_id` on the `Notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "actor_id",
ADD COLUMN     "actor_id" INTEGER NOT NULL;
