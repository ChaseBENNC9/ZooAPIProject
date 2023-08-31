/*
  Warnings:

  - Added the required column `firstName` to the `Worker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hireDate` to the `Worker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Worker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Worker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zooId` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Worker" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "hireDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "terminationDate" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "zooId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_zooId_fkey" FOREIGN KEY ("zooId") REFERENCES "Zoo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
