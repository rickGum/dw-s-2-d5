/*
  Warnings:

  - You are about to drop the column `point` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "point",
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;
