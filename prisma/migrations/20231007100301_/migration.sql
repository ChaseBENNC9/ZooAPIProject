-- DropForeignKey
ALTER TABLE "TourGroup" DROP CONSTRAINT "TourGroup_enclosureId_fkey";

-- DropForeignKey
ALTER TABLE "TourGroup" DROP CONSTRAINT "TourGroup_workerId_fkey";

-- AddForeignKey
ALTER TABLE "TourGroup" ADD CONSTRAINT "TourGroup_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourGroup" ADD CONSTRAINT "TourGroup_enclosureId_fkey" FOREIGN KEY ("enclosureId") REFERENCES "Enclosure"("id") ON DELETE CASCADE ON UPDATE CASCADE;
