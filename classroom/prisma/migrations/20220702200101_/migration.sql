/*
  Warnings:

  - A unique constraint covering the columns `[authUserId]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_authUserId_key" ON "Enrollment"("authUserId");
