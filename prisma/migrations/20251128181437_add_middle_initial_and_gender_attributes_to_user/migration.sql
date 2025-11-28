-- AlterTable
ALTER TABLE "users" ADD COLUMN     "gender" "Gender_enum" NOT NULL DEFAULT 'Male',
ADD COLUMN     "middleInitial" TEXT NOT NULL DEFAULT 'A';
