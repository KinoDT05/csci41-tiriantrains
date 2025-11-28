/*
  Warnings:

  - You are about to drop the column `locationList` on the `Route` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Route" DROP COLUMN "locationList",
ADD COLUMN     "location" "Location_enum" NOT NULL DEFAULT 'WestWood';
