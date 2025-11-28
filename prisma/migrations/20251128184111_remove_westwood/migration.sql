/*
  Warnings:

  - The values [WestWood] on the enum `Location_enum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Location_enum_new" AS ENUM ('Intertown', 'WesternWood');
ALTER TABLE "public"."Route" ALTER COLUMN "location" DROP DEFAULT;
ALTER TABLE "Route" ALTER COLUMN "location" TYPE "Location_enum_new" USING ("location"::text::"Location_enum_new");
ALTER TYPE "Location_enum" RENAME TO "Location_enum_old";
ALTER TYPE "Location_enum_new" RENAME TO "Location_enum";
DROP TYPE "public"."Location_enum_old";
ALTER TABLE "Route" ALTER COLUMN "location" SET DEFAULT 'WesternWood';
COMMIT;

-- AlterTable
ALTER TABLE "Route" ALTER COLUMN "location" SET DEFAULT 'WesternWood';
