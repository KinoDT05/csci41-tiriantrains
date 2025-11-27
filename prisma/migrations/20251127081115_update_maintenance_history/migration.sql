/*
  Warnings:

  - The `condition` column on the `MaintenanceHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Condition_enum" AS ENUM ('Excellent', 'VeryGood', 'Good', 'Ok', 'Bad');

-- AlterTable
ALTER TABLE "MaintenanceHistory" DROP COLUMN "condition",
ADD COLUMN     "condition" "Condition_enum" NOT NULL DEFAULT 'Excellent';
