/*
  Warnings:

  - You are about to drop the column `Arrival` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "Arrival",
ADD COLUMN     "arrival" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
