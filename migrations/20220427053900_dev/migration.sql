/*
  Warnings:

  - You are about to alter the column `account` on the `MTAccount` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `openPrice` on the `MTOrder` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(10,5)`.
  - You are about to alter the column `stopLoss` on the `MTOrder` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(10,5)`.
  - You are about to alter the column `takeProfit` on the `MTOrder` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(10,5)`.
  - You are about to alter the column `account` on the `MTOrder` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "MTOrder" DROP CONSTRAINT "MTOrder_account_fkey";

-- AlterTable
ALTER TABLE "MTAccount" ALTER COLUMN "account" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "MTOrder" ALTER COLUMN "openPrice" SET DATA TYPE DECIMAL(10,5),
ALTER COLUMN "stopLoss" SET DATA TYPE DECIMAL(10,5),
ALTER COLUMN "takeProfit" SET DATA TYPE DECIMAL(10,5),
ALTER COLUMN "account" SET DATA TYPE INTEGER;

-- AddForeignKey
ALTER TABLE "MTOrder" ADD CONSTRAINT "MTOrder_account_fkey" FOREIGN KEY ("account") REFERENCES "MTAccount"("account") ON DELETE CASCADE ON UPDATE CASCADE;
