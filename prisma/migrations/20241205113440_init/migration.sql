-- CreateEnum
CREATE TYPE "CategoryElectronic" AS ENUM ('Smartphones', 'Laptops', 'Tablets', 'Headphones', 'SmartWatches', 'Speakers', 'Cameras', 'Printers', 'GameConsoles');

-- CreateEnum
CREATE TYPE "StorageType" AS ENUM ('SSD', 'HDD', 'EMMC', 'NVMe');

-- CreateTable
CREATE TABLE "Electronic" (
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

    CONSTRAINT "Electronic_pkey" PRIMARY KEY ("id")
);
