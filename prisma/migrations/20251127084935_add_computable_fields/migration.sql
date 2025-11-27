/*
  Warnings:

  - Made the column `Arrival` on table `Schedule` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Schedule" ALTER COLUMN "departure" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "Arrival" SET NOT NULL,
ALTER COLUMN "Arrival" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "total_cost" INTEGER NOT NULL DEFAULT 0;
