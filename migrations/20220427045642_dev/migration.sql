/*
  Warnings:

  - You are about to alter the column `balance` on the `MTAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to alter the column `commission_blocked` on the `MTAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to alter the column `credit` on the `MTAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to alter the column `equity` on the `MTAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to alter the column `liabilities` on the `MTAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to alter the column `margin` on the `MTAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to alter the column `margin_assets` on the `MTAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to alter the column `margin_free` on the `MTAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to alter the column `margin_initial` on the `MTAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to alter the column `margin_level` on the `MTAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to alter the column `margin_maintenance` on the `MTAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to alter the column `margin_so_call` on the `MTAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to alter the column `margin_so_so` on the `MTAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to alter the column `profit` on the `MTAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to alter the column `openPrice` on the `MTOrder` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to alter the column `stopLoss` on the `MTOrder` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to alter the column `takeProfit` on the `MTOrder` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `Decimal(10,2)`.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MTAccount" ALTER COLUMN "balance" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "commission_blocked" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "credit" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "equity" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "liabilities" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "margin" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "margin_assets" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "margin_free" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "margin_initial" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "margin_level" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "margin_maintenance" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "margin_so_call" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "margin_so_so" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "profit" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "MTOrder" ALTER COLUMN "openPrice" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "stopLoss" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "takeProfit" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstname" TEXT,
ADD COLUMN     "lastname" TEXT,
ALTER COLUMN "password" SET NOT NULL;
