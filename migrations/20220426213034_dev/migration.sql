/*
  Warnings:

  - A unique constraint covering the columns `[account]` on the table `MTAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account` to the `MTAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `MTAccount` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MTAccount" ADD COLUMN     "account" BIGINT NOT NULL,
ADD COLUMN     "balance" DECIMAL(10,8),
ADD COLUMN     "commission_blocked" DECIMAL(10,8),
ADD COLUMN     "company" TEXT,
ADD COLUMN     "credit" DECIMAL(10,8),
ADD COLUMN     "currency" TEXT,
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "equity" DECIMAL(10,8),
ADD COLUMN     "leverage" INTEGER,
ADD COLUMN     "liabilities" DECIMAL(10,8),
ADD COLUMN     "limit_orders" INTEGER,
ADD COLUMN     "login" TEXT,
ADD COLUMN     "margin" DECIMAL(10,8),
ADD COLUMN     "margin_assets" DECIMAL(10,8),
ADD COLUMN     "margin_free" DECIMAL(10,8),
ADD COLUMN     "margin_initial" DECIMAL(10,8),
ADD COLUMN     "margin_level" DECIMAL(10,8),
ADD COLUMN     "margin_maintenance" DECIMAL(10,8),
ADD COLUMN     "margin_so_call" DECIMAL(10,8),
ADD COLUMN     "margin_so_mode" INTEGER,
ADD COLUMN     "margin_so_so" DECIMAL(10,8),
ADD COLUMN     "profit" DECIMAL(10,8),
ADD COLUMN     "trade_allowed" INTEGER,
ADD COLUMN     "trade_expert" INTEGER,
ADD COLUMN     "trade_mode" INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "company" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MTOrder" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "ticket" INTEGER NOT NULL,
    "magicNumber" INTEGER NOT NULL,
    "openTime" TEXT,
    "type" TEXT,
    "size" DECIMAL(10,2),
    "item" TEXT,
    "openPrice" DECIMAL(10,8),
    "stopLoss" DECIMAL(10,8),
    "takeProfit" DECIMAL(10,8),
    "closeTime" TEXT,
    "commission" DECIMAL(10,2),
    "swap" DECIMAL(10,2),
    "profit" DECIMAL(10,2),
    "comment" TEXT,
    "account" BIGINT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MTOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_uuid_key" ON "Customer"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MTOrder_uuid_key" ON "MTOrder"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "MTAccount_account_key" ON "MTAccount"("account");

-- AddForeignKey
ALTER TABLE "MTAccount" ADD CONSTRAINT "MTAccount_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MTOrder" ADD CONSTRAINT "MTOrder_account_fkey" FOREIGN KEY ("account") REFERENCES "MTAccount"("account") ON DELETE CASCADE ON UPDATE CASCADE;
