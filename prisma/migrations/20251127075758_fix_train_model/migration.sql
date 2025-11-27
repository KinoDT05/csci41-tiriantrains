/*
  Warnings:

  - The primary key for the `TrainModel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `modelID` column on the `TrainModel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `trainModelID` on the `Train` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Train" DROP CONSTRAINT "Train_trainModelID_fkey";

-- AlterTable
ALTER TABLE "Train" DROP COLUMN "trainModelID",
ADD COLUMN     "trainModelID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TrainModel" DROP CONSTRAINT "TrainModel_pkey",
DROP COLUMN "modelID",
ADD COLUMN     "modelID" SERIAL NOT NULL,
ADD CONSTRAINT "TrainModel_pkey" PRIMARY KEY ("modelID");

-- AddForeignKey
ALTER TABLE "Train" ADD CONSTRAINT "Train_trainModelID_fkey" FOREIGN KEY ("trainModelID") REFERENCES "TrainModel"("modelID") ON DELETE RESTRICT ON UPDATE CASCADE;
