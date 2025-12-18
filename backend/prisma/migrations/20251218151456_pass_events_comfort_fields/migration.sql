/*
  Warnings:

  - Added the required column `aosDow` to the `PassEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aosTime` to the `PassEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `losTime` to the `PassEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PassEvent" ADD COLUMN     "aosDow" TEXT NOT NULL,
ADD COLUMN     "aosTime" TEXT NOT NULL,
ADD COLUMN     "losTime" TEXT NOT NULL;
