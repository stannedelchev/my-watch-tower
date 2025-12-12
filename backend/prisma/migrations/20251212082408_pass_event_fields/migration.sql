-- CreateTable
CREATE TABLE "PassEvent" (
    "id" SERIAL NOT NULL,
    "groundStationId" INTEGER NOT NULL,
    "satelliteId" INTEGER NOT NULL,
    "orbitNumber" INTEGER NOT NULL,
    "aos" TIMESTAMP(3) NOT NULL,
    "los" TIMESTAMP(3) NOT NULL,
    "maxElevation" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "visibleSegments" TEXT NOT NULL,
    "totalVisibleDuration" INTEGER NOT NULL,
    "maxVisibleElevation" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PassEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PassEvent_satelliteId_groundStationId_orbitNumber_key" ON "PassEvent"("satelliteId", "groundStationId", "orbitNumber");

-- AddForeignKey
ALTER TABLE "PassEvent" ADD CONSTRAINT "PassEvent_groundStationId_fkey" FOREIGN KEY ("groundStationId") REFERENCES "GroundStation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassEvent" ADD CONSTRAINT "PassEvent_satelliteId_fkey" FOREIGN KEY ("satelliteId") REFERENCES "Satellite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
