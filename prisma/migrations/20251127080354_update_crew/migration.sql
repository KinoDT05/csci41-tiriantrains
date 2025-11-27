/*
  Warnings:

  - You are about to drop the column `maintainer` on the `MaintenanceHistory` table. All the data in the column will be lost.
  - You are about to drop the `Crew` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `crewInCharge` to the `MaintenanceHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MaintenanceHistory" DROP CONSTRAINT "MaintenanceHistory_maintainer_fkey";

-- AlterTable
ALTER TABLE "MaintenanceHistory" DROP COLUMN "maintainer",
ADD COLUMN     "crewInCharge" TEXT NOT NULL;

-- DropTable
DROP TABLE "Crew";
