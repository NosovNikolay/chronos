/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CalendarEventType" AS ENUM ('ARRANGEMENT', 'REMINDER', 'TASK');

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_calendarId_fkey";

-- DropTable
DROP TABLE "Event";

-- DropEnum
DROP TYPE "EventType";

-- CreateTable
CREATE TABLE "CalendarEvent" (
    "calendarId" UUID NOT NULL,
    "id" UUID NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" VARCHAR(255) NOT NULL,
    "isFullDay" BOOLEAN NOT NULL,
    "type" "CalendarEventType" NOT NULL,

    CONSTRAINT "CalendarEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CalendarEvent" ADD CONSTRAINT "CalendarEvent_calendarId_fkey" FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
