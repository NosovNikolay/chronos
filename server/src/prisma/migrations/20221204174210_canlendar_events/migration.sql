/*
  Warnings:

  - You are about to drop the column `calendarRolesId` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `calendarRolesId` on the `User` table. All the data in the column will be lost.
  - Added the required column `calendarId` to the `CalendarRoles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `CalendarRoles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_calendarRolesId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_calendarRolesId_fkey";

-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "calendarRolesId";

-- AlterTable
ALTER TABLE "CalendarRoles" ADD COLUMN     "calendarId" UUID NOT NULL,
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "calendarRolesId";

-- AddForeignKey
ALTER TABLE "CalendarRoles" ADD CONSTRAINT "CalendarRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarRoles" ADD CONSTRAINT "CalendarRoles_calendarId_fkey" FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
