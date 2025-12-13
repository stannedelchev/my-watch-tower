/*
  Warnings:

  - The `uplinkLow` column on the `Transmitter` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `uplinkHigh` column on the `Transmitter` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `downlinkLow` column on the `Transmitter` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `downlinkHigh` column on the `Transmitter` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Transmitter" DROP COLUMN "uplinkLow",
ADD COLUMN     "uplinkLow" BIGINT,
DROP COLUMN "uplinkHigh",
ADD COLUMN     "uplinkHigh" BIGINT,
DROP COLUMN "downlinkLow",
ADD COLUMN     "downlinkLow" BIGINT,
DROP COLUMN "downlinkHigh",
ADD COLUMN     "downlinkHigh" BIGINT;
