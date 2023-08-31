/*
  Warnings:

  - You are about to drop the column `established` on the `Enclosure` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Enclosure" DROP COLUMN "established";

-- AlterTable
ALTER TABLE "Zoo" ALTER COLUMN "established" SET DATA TYPE DATE;
