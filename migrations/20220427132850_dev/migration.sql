/*
  Warnings:

  - The `mtCreateAt` column on the `MTAccount` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `openTime` column on the `MTOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `closeTime` column on the `MTOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `customerGroupId` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "commission" INTEGER,
ADD COLUMN     "customerGroupId" INTEGER NOT NULL,
ADD COLUMN     "risky" INTEGER,
ADD COLUMN     "setup" INTEGER,
ADD COLUMN     "workstation" TEXT;

-- AlterTable
ALTER TABLE "MTAccount" DROP COLUMN "mtCreateAt",
ADD COLUMN     "mtCreateAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "MTOrder" DROP COLUMN "openTime",
ADD COLUMN     "openTime" TIMESTAMP(3),
DROP COLUMN "closeTime",
ADD COLUMN     "closeTime" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "CustomerGroup" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "settings" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerGroup_uuid_key" ON "CustomerGroup"("uuid");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_customerGroupId_fkey" FOREIGN KEY ("customerGroupId") REFERENCES "CustomerGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
