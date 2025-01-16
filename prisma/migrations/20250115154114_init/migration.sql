/*
  Warnings:

  - The `image` column on the `electronics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `image` column on the `fashions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `image` column on the `groceries` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `image` column on the `home_kitchen` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `image` column on the `premium` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "electronics" DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];

-- AlterTable
ALTER TABLE "fashions" DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];

-- AlterTable
ALTER TABLE "groceries" DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];

-- AlterTable
ALTER TABLE "home_kitchen" DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];

-- AlterTable
ALTER TABLE "premium" DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];
