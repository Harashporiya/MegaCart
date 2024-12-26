-- CreateEnum
CREATE TYPE "categoryFruits" AS ENUM ('Imported_Plum', 'DragonFruit', 'Apple', 'LonganImported', 'GreenKiwi', 'ApplePinkLady');

-- CreateEnum
CREATE TYPE "plum" AS ENUM ('Pcs_2', 'Pcs_4', 'Pcs_6', 'Pcs_8', 'Pcs_10');

-- CreateEnum
CREATE TYPE "DragonFruit" AS ENUM ('Gram_200', 'Gram_400', 'Gram_500', 'Gram_700', 'Gram_800', 'Gram_1000');

-- CreateEnum
CREATE TYPE "Apple" AS ENUM ('Gram_500', 'Gram_1000', 'Gram_1500', 'Gram_2000', 'Gram_2500', 'Gram_3000');

-- CreateEnum
CREATE TYPE "ImportedLongan" AS ENUM ('GRAM_150', 'GRAM_250', 'GRAM_400', 'GRAM_450', 'GRAM_800', 'GRAM_1000', 'GRAM_1500');

-- CreateEnum
CREATE TYPE "GreenKiwi" AS ENUM ('Pcs_2', 'Pcs_4', 'Pcs_6', 'Pcs_8', 'Pcs_10');

-- CreateEnum
CREATE TYPE "ApplePinkLady" AS ENUM ('Gram_500', 'Gram_1000', 'Gram_1500', 'Gram_2000', 'Gram_2500', 'Gram_3000');

-- CreateTable
CREATE TABLE "premiumFruits" (
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

    CONSTRAINT "premiumFruits_pkey" PRIMARY KEY ("id")
);
