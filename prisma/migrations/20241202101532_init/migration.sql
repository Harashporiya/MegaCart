/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('WomensClothing', 'MensClothing', 'KidsClothing', 'Accessories', 'Footwear', 'BagsAndLuggage');

-- CreateEnum
CREATE TYPE "TypeClothe" AS ENUM ('Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Underwear', 'Sportswear');

-- CreateEnum
CREATE TYPE "AccessorySize" AS ENUM ('OneSize', 'Small', 'Medium', 'Large');

-- CreateEnum
CREATE TYPE "FootwearSize" AS ENUM ('US_6', 'US_7', 'US_8', 'US_9', 'US_10', 'US_11', 'US_12');

-- CreateEnum
CREATE TYPE "BagSize" AS ENUM ('Small', 'Medium', 'Large', 'XLarge', 'Compact', 'Weekend', 'Carry_On');

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fashion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "typeClothe" "TypeClothe",
    "size" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,

    CONSTRAINT "Fashion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
