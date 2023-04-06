/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Plugin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Plugin_name_key" ON "Plugin"("name");
