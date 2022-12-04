-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('ADMIN', 'PARTICIPANT');

-- AlterTable
ALTER TABLE "Calendar" ADD COLUMN     "calendarRolesId" UUID;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "calendarRolesId" UUID;

-- CreateTable
CREATE TABLE "CalendarRoles" (
    "id" UUID NOT NULL,
    "role" "UserRoles" NOT NULL,

    CONSTRAINT "CalendarRoles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_calendarRolesId_fkey" FOREIGN KEY ("calendarRolesId") REFERENCES "CalendarRoles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_calendarRolesId_fkey" FOREIGN KEY ("calendarRolesId") REFERENCES "CalendarRoles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
