/*
  Warnings:

  - The values [HOME_AND_KITCHEN] on the enum `CategoryHomeKitchen` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `volumeUnit` on the `home_kitchen` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CategoryHomeKitchen_new" AS ENUM ('COOKWARE', 'KITCHEN_APPLIANCES', 'DINING_AND_SERVEWARE', 'HOME_DECOR', 'CLEANING_SUPPLIES');
ALTER TABLE "home_kitchen" ALTER COLUMN "category" TYPE "CategoryHomeKitchen_new" USING ("category"::text::"CategoryHomeKitchen_new");
ALTER TYPE "CategoryHomeKitchen" RENAME TO "CategoryHomeKitchen_old";
ALTER TYPE "CategoryHomeKitchen_new" RENAME TO "CategoryHomeKitchen";
DROP TYPE "CategoryHomeKitchen_old";
COMMIT;

-- AlterTable
ALTER TABLE "home_kitchen" DROP COLUMN "volumeUnit";

-- DropEnum
DROP TYPE "VolumeUnit";
