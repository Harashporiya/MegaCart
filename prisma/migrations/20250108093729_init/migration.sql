-- CreateEnum
CREATE TYPE "CategoryHomeKitchen" AS ENUM ('HOME_AND_KITCHEN', 'COOKWARE', 'KITCHEN_APPLIANCES', 'DINING_AND_SERVEWARE', 'HOME_DECOR', 'CLEANING_SUPPLIES');

-- CreateEnum
CREATE TYPE "VolumeUnit" AS ENUM ('LITER', 'MILLILITER', 'GALLON', 'OUNCE', 'CUP');

-- CreateTable
CREATE TABLE "home_kitchen" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "CategoryHomeKitchen" NOT NULL,
    "capacity" DOUBLE PRECISION,
    "volumeUnit" "VolumeUnit",
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "home_kitchen_pkey" PRIMARY KEY ("id")
);
