-- AlterTable
ALTER TABLE "Satellite" ADD COLUMN     "isTracked" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SatelliteTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SatelliteTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE INDEX "_SatelliteTags_B_index" ON "_SatelliteTags"("B");

-- AddForeignKey
ALTER TABLE "_SatelliteTags" ADD CONSTRAINT "_SatelliteTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Satellite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SatelliteTags" ADD CONSTRAINT "_SatelliteTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
