/*
  Warnings:

  - Changed the type of `role` on the `CalendarRoles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserRolesEnum" AS ENUM ('ADMIN', 'PARTICIPANT');

-- AlterTable
ALTER TABLE "CalendarRoles" DROP COLUMN "role",
ADD COLUMN     "role" "UserRolesEnum" NOT NULL;

-- DropEnum
DROP TYPE "UserRoles";
