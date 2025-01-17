-- CreateEnum
CREATE TYPE "CategoryHomeImprovement" AS ENUM ('Tools', 'Lighting', 'PaintAndSupplies', 'BathroomAndFixtures', 'HeatingAndCooling');

-- CreateTable
CREATE TABLE "homeImprovement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "category" "CategoryHomeImprovement" NOT NULL,
    "color" TEXT,
    "numberOfItem" TEXT,
    "material" TEXT,
    "headStyle" TEXT,
    "roomType" TEXT,
    "itemVolume" TEXT,
    "itemForm" TEXT,
    "size" TEXT,
    "finishType" TEXT,
    "capacity" TEXT,
    "coolingPower" TEXT,
    "product" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "homeImprovement_pkey" PRIMARY KEY ("id")
);
