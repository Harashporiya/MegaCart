-- CreateEnum
CREATE TYPE "Category" AS ENUM ('WomensClothing', 'MensClothing', 'KidsClothing', 'Accessories', 'Footwear', 'BagsAndLuggage');

-- CreateEnum
CREATE TYPE "AccessorySize" AS ENUM ('OneSize', 'Small', 'Medium', 'Large');

-- CreateEnum
CREATE TYPE "FootwearSize" AS ENUM ('US_6', 'US_7', 'US_8', 'US_9', 'US_10', 'US_11', 'US_12');

-- CreateEnum
CREATE TYPE "BagSize" AS ENUM ('Small', 'Medium', 'Large', 'XLarge', 'Compact', 'Weekend', 'Carry_On');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('S', 'M', 'L', 'SM', 'XL', 'XXL', 'XXXL');

-- CreateTable
CREATE TABLE "fashions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "accessorySize" "AccessorySize",
    "footwearSize" "FootwearSize",
    "bagSize" "BagSize",
    "size" "Size",
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "fashions_pkey" PRIMARY KEY ("id")
);
