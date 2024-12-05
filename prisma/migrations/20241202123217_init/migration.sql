/*
  Warnings:

  - You are about to drop the column `typeClothe` on the `Fashion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fashion" DROP COLUMN "typeClothe";

-- DropEnum
DROP TYPE "TypeClothe";
