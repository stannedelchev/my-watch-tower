/*
  Warnings:

  - Made the column `sourceId` on table `Satellite` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Satellite" DROP CONSTRAINT "Satellite_sourceId_fkey";

-- DropIndex
DROP INDEX "TleSource_url_key";

-- AlterTable
ALTER TABLE "Satellite" ALTER COLUMN "sourceId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Transmitter" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "status" TEXT,
    "uplinkLow" TEXT,
    "uplinkHigh" TEXT,
    "downlinkLow" TEXT,
    "downlinkHigh" TEXT,
    "mode" TEXT,
    "baud" DOUBLE PRECISION,
    "invert" BOOLEAN NOT NULL DEFAULT false,
    "citation" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "satelliteNoradId" INTEGER NOT NULL,

    CONSTRAINT "Transmitter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transmitter_uuid_key" ON "Transmitter"("uuid");

-- AddForeignKey
ALTER TABLE "Satellite" ADD CONSTRAINT "Satellite_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "TleSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transmitter" ADD CONSTRAINT "Transmitter_satelliteNoradId_fkey" FOREIGN KEY ("satelliteNoradId") REFERENCES "Satellite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
