/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `prefeitos` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `vereadores` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `vice_prefeitos` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `prefeitos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `vereadores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `vice_prefeitos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prefeitos" DROP COLUMN "updatedAt",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "vereadores" DROP COLUMN "updatedAt",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "vice_prefeitos" DROP COLUMN "updatedAt",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
