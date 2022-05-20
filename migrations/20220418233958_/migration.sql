/*
  Warnings:

  - You are about to drop the column `link_button1` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `link_button2` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `text_button1` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `text_button2` on the `Post` table. All the data in the column will be lost.
  - Added the required column `userGroupId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "link_button1",
DROP COLUMN "link_button2",
DROP COLUMN "text_button1",
DROP COLUMN "text_button2";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "price" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userGroupId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "type" TEXT,
    "name" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroup" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT,
    "grant" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MTAccount" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT,
    "password" TEXT,
    "server" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MTAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_uuid_key" ON "Profile"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "UserGroup_uuid_key" ON "UserGroup"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "MTAccount_uuid_key" ON "MTAccount"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "MTAccount_username_key" ON "MTAccount"("username");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userGroupId_fkey" FOREIGN KEY ("userGroupId") REFERENCES "UserGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
