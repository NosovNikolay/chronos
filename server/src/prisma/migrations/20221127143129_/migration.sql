/*
  Warnings:

  - Changed the type of `end` on the `CalendarEvent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CalendarEvent" DROP COLUMN "end",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL;
