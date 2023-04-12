/*
  Warnings:

  - You are about to drop the `PluginSubmissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Plugin" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "PluginSubmissions";

-- CreateTable
CREATE TABLE "OSPlugin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "githubURL" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OSPlugin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OSPlugin_name_key" ON "OSPlugin"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OSPlugin_githubURL_key" ON "OSPlugin"("githubURL");
