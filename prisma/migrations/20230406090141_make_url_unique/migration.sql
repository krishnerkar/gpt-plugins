/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Plugin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Plugin_url_key" ON "Plugin"("url");
