-- CreateEnum
CREATE TYPE "CalendarViewStatus" AS ENUM ('HIDDEN', 'VISIBLE');

-- AlterTable
ALTER TABLE "Calendar" ADD COLUMN     "status" "CalendarViewStatus";
