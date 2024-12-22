/*
  Warnings:

  - You are about to drop the `Electronic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fashion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Groceries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Electronic";

-- DropTable
DROP TABLE "Fashion";

-- DropTable
DROP TABLE "Groceries";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "electronics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT,
    "category" "CategoryElectronic" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT[],
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "processorType" TEXT,
    "ramSize" INTEGER,
    "storageType" "StorageType",
    "storageCapacity" INTEGER,
    "displaySize" DOUBLE PRECISION,
    "batteryCapacity" INTEGER,
    "warranty" INTEGER,
    "color" TEXT,
    "weight" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "electronics_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
