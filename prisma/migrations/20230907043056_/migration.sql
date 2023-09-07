/*
  Warnings:

  - You are about to drop the column `tourGroupId` on the `Visitor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Zoo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_tourGroupId_fkey";

-- AlterTable
ALTER TABLE "Enclosure" ALTER COLUMN "visitorCapacity" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "tourGroupId",
ALTER COLUMN "visitDate" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "_TourGroupToVisitor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TourGroupToVisitor_AB_unique" ON "_TourGroupToVisitor"("A", "B");

-- CreateIndex
CREATE INDEX "_TourGroupToVisitor_B_index" ON "_TourGroupToVisitor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Zoo_name_key" ON "Zoo"("name");

-- AddForeignKey
ALTER TABLE "_TourGroupToVisitor" ADD CONSTRAINT "_TourGroupToVisitor_A_fkey" FOREIGN KEY ("A") REFERENCES "TourGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TourGroupToVisitor" ADD CONSTRAINT "_TourGroupToVisitor_B_fkey" FOREIGN KEY ("B") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
