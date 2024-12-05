/*
  Warnings:

  - Added the required column `accessorySize` to the `Fashion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bagSize` to the `Fashion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `footwearSize` to the `Fashion` table without a default value. This is not possible if the table is not empty.
  - Made the column `typeClothe` on table `Fashion` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `Fashion` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Fashion` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Fashion" ADD COLUMN     "accessorySize" "AccessorySize" NOT NULL,
ADD COLUMN     "bagSize" "BagSize" NOT NULL,
ADD COLUMN     "footwearSize" "FootwearSize" NOT NULL,
ALTER COLUMN "typeClothe" SET NOT NULL,
ALTER COLUMN "size" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
