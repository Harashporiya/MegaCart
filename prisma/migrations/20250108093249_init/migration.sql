-- CreateEnum
CREATE TYPE "CategoryGroceries" AS ENUM ('Fresh_vegetables', 'Fresh_fruits', 'Canned_foods', 'Sauces', 'Oils_and_Vinegars');

-- CreateEnum
CREATE TYPE "weightVegitablesAndFruites" AS ENUM ('Gram_500', 'Gram_1000', 'Gram_1500', 'Gram_2000', 'Gram_2500', 'Gram_3000');

-- CreateEnum
CREATE TYPE "SaucesWeight" AS ENUM ('Gram_250', 'Gram_450', 'Gram_500', 'Gram_1000', 'Gram_1500', 'Gram_2000');

-- CreateEnum
CREATE TYPE "OilsAndVinegarsWeight" AS ENUM ('Ml_250', 'Ml_500', 'Ml_1000', 'Ml_1500', 'Ml_2000');

-- CreateEnum
CREATE TYPE "CannedFoodsWeight" AS ENUM ('GRAM_150', 'GRAM_250', 'GRAM_400', 'GRAM_450', 'GRAM_800', 'GRAM_1000', 'GRAM_1500');

-- CreateTable
CREATE TABLE "groceries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "CategoryGroceries" NOT NULL,
    "weight" "weightVegitablesAndFruites",
    "SaucesWeight" "SaucesWeight",
    "OilsAndVinegarsWeight" "OilsAndVinegarsWeight",
    "CannedFoodsWeight" "CannedFoodsWeight",
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "groceries_pkey" PRIMARY KEY ("id")
);
