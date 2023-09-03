/*
  Warnings:

  - You are about to drop the column `tourGroupId` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the `TourGroup` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `deathDate` on table `Animal` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TourGroup" DROP CONSTRAINT "TourGroup_enclosureId_fkey";

-- DropForeignKey
ALTER TABLE "TourGroup" DROP CONSTRAINT "TourGroup_workerId_fkey";

-- DropForeignKey
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_tourGroupId_fkey";

-- DropIndex
DROP INDEX "Enclosure_name_key";

-- AlterTable
ALTER TABLE "Animal" ALTER COLUMN "deathDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "tourGroupId";

-- DropTable
DROP TABLE "TourGroup";
