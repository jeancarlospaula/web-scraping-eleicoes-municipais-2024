/*
  Warnings:

  - Added the required column `updatedAt` to the `prefeitos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `vereadores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `vice_prefeitos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prefeitos" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "vereadores" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "vice_prefeitos" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
