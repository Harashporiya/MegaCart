-- CreateEnum
CREATE TYPE "CategoryBeauty" AS ENUM ('Skincare', 'Makeup', 'Hair_Care', 'Fragrances', 'Personal_Care', 'Bath_Body');

-- CreateTable
CREATE TABLE "beauty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "Brand" TEXT NOT NULL,
    "category" "CategoryBeauty",
    "itemVolume" TEXT,
    "itemForm" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beauty_pkey" PRIMARY KEY ("id")
);
