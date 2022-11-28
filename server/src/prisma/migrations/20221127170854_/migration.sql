/*
  Warnings:

  - A unique constraint covering the columns `[calendarId,id]` on the table `CalendarEvent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CalendarEvent_calendarId_id_key" ON "CalendarEvent"("calendarId", "id");
