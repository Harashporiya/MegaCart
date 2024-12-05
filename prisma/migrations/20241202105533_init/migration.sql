/*
  Warnings:

  - Changed the type of `size` on the `Fashion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('S', 'M', 'L', 'SM', 'XL', 'XXL', 'XXXL');

-- AlterTable
ALTER TABLE "Fashion" DROP COLUMN "size",
ADD COLUMN     "size" "Size" NOT NULL;
