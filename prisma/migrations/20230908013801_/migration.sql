/*
  Warnings:

  - Added the required column `description` to the `TourGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TourGroup` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `ticketType` on the `Visitor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('ADULT', 'CHILD', 'SENIOR');

-- AlterTable
ALTER TABLE "TourGroup" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "ticketType",
ADD COLUMN     "ticketType" "TicketType" NOT NULL;
