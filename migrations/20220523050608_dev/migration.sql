/*
  Warnings:

  - You are about to drop the column `setup` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `workstation` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "setup",
DROP COLUMN "workstation";

-- AlterTable
ALTER TABLE "MTAccount" ADD COLUMN     "comments" TEXT,
ADD COLUMN     "commission" INTEGER,
ADD COLUMN     "platform" TEXT,
ADD COLUMN     "risky" INTEGER,
ADD COLUMN     "setup" INTEGER,
ADD COLUMN     "workstation" TEXT;

-- CreateIndex
CREATE INDEX "Customer_firstname_lastname_idx" ON "Customer" USING GIST ("firstname", "lastname");

-- CreateIndex
CREATE INDEX "Customer_company_idx" ON "Customer" USING GIST ("company");

-- CreateIndex
CREATE INDEX "Customer_email_idx" ON "Customer" USING GIST ("email");

-- CreateIndex
CREATE INDEX "Customer_phone_idx" ON "Customer" USING GIST ("phone");

-- CreateIndex
CREATE INDEX "CustomerGroup_name_idx" ON "CustomerGroup" USING GIST ("name");

-- CreateIndex
CREATE INDEX "MTAccount_name_idx" ON "MTAccount" USING GIST ("name");

-- CreateIndex
CREATE INDEX "MTAccount_server_idx" ON "MTAccount" USING GIST ("server");

-- CreateIndex
CREATE INDEX "MTAccount_company_idx" ON "MTAccount" USING GIST ("company");

-- CreateIndex
CREATE INDEX "MTAccount_workstation_idx" ON "MTAccount" USING GIST ("workstation");

-- CreateIndex
CREATE INDEX "MTAccount_platform_idx" ON "MTAccount" USING GIST ("platform");

-- CreateIndex
CREATE INDEX "MTAccount_comments_idx" ON "MTAccount" USING GIST ("comments");

-- CreateIndex
CREATE INDEX "MTOrder_item_idx" ON "MTOrder" USING GIST ("item");
