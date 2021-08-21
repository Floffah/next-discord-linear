/*
  Warnings:

  - You are about to drop the `Webhook` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hookId` to the `Endpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hookToken` to the `Endpoint` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Webhook" DROP CONSTRAINT "Webhook_endpointId_fkey";

-- AlterTable
ALTER TABLE "Endpoint" ADD COLUMN     "hookId" TEXT NOT NULL,
ADD COLUMN     "hookToken" TEXT NOT NULL;

-- DropTable
DROP TABLE "Webhook";

-- DropEnum
DROP TYPE "EventTypes";
