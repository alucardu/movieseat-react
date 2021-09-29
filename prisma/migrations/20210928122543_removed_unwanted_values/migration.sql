/*
  Warnings:

  - You are about to drop the column `icon` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "icon",
DROP COLUMN "link",
DROP COLUMN "thumbnail";
