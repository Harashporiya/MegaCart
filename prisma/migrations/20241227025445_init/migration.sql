/*
  Warnings:

  - You are about to drop the `premiumFruits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "premiumFruits";

-- CreateTable
CREATE TABLE "premium" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "categoryFruits",
    "importantPlum" "plum",
    "DragonFruit" "DragonFruit",
    "Apple" "Apple",
    "ImportedLongan" "ImportedLongan",
    "GreenKiwi" "GreenKiwi",
    "ApplePinkLady" "ApplePinkLady",
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "premium_pkey" PRIMARY KEY ("id")
);
