/*
  Warnings:

  - The `horizonmask` column on the `GroundStation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GroundStation" DROP COLUMN "horizonmask",
ADD COLUMN     "horizonmask" BYTEA NOT NULL DEFAULT '\x';
