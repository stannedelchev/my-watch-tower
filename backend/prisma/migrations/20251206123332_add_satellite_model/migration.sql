-- CreateTable
CREATE TABLE "Satellite" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "line1" TEXT NOT NULL,
    "line2" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sourceId" INTEGER,

    CONSTRAINT "Satellite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Satellite" ADD CONSTRAINT "Satellite_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "TleSource"("id") ON DELETE SET NULL ON UPDATE CASCADE;
