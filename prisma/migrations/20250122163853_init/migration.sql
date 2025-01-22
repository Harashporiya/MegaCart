-- CreateEnum
CREATE TYPE "CategorySportsToysLuggage" AS ENUM ('OutdoorSports', 'IndoorGames', 'FitnessEquipment', 'ToysAndCollectibles', 'Luggage', 'TravelAndAccessories');

-- CreateTable
CREATE TABLE "sportsToysLuggage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "category" "CategorySportsToysLuggage" NOT NULL,
    "maxiumWeight" TEXT,
    "itemWeight" TEXT,
    "color" TEXT,
    "material" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sportsToysLuggage_pkey" PRIMARY KEY ("id")
);
