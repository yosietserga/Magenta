/*
  Warnings:

  - A unique constraint covering the columns `[ticket]` on the table `MTOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MTAccount" ADD COLUMN     "mtCreateAt" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "MTOrder_ticket_key" ON "MTOrder"("ticket");
