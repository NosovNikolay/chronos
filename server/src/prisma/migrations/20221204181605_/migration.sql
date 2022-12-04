/*
  Warnings:

  - You are about to drop the `CalendarRoles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CalendarRoles" DROP CONSTRAINT "CalendarRoles_calendarId_fkey";

-- DropForeignKey
ALTER TABLE "CalendarRoles" DROP CONSTRAINT "CalendarRoles_userId_fkey";

-- DropTable
DROP TABLE "CalendarRoles";

-- CreateTable
CREATE TABLE "CalendarRole" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "calendarId" UUID NOT NULL,
    "role" "UserRolesEnum" NOT NULL,

    CONSTRAINT "CalendarRole_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CalendarRole" ADD CONSTRAINT "CalendarRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarRole" ADD CONSTRAINT "CalendarRole_calendarId_fkey" FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
