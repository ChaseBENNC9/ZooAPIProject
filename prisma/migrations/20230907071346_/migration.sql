/*
  Warnings:

  - You are about to drop the column `animalCapacity` on the `Enclosure` table. All the data in the column will be lost.
  - Added the required column `temporary` to the `Enclosure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enclosure" DROP COLUMN "animalCapacity",
ADD COLUMN     "temporary" BOOLEAN NOT NULL;
