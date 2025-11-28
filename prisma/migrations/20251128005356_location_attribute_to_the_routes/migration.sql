/*
  Warnings:

  - You are about to drop the column `locationList` on the `Station` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "locationList" "Location_enum" NOT NULL DEFAULT 'WestWood';

-- AlterTable
ALTER TABLE "Station" DROP COLUMN "locationList";
