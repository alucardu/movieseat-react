/*
  Warnings:

  - Added the required column `value` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "value" TEXT;
