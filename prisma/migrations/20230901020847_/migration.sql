/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Enclosure` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tourGroupId` to the `Visitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" ALTER COLUMN "deathDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Visitor" ADD COLUMN     "tourGroupId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TourGroup" (
    "id" SERIAL NOT NULL,
    "zooId" INTEGER NOT NULL,
    "workerId" INTEGER NOT NULL,
    "enclosureId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TourGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enclosure_name_key" ON "Enclosure"("name");

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_tourGroupId_fkey" FOREIGN KEY ("tourGroupId") REFERENCES "TourGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourGroup" ADD CONSTRAINT "TourGroup_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourGroup" ADD CONSTRAINT "TourGroup_enclosureId_fkey" FOREIGN KEY ("enclosureId") REFERENCES "Enclosure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
