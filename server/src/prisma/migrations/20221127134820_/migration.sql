-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('ARRANGEMENT', 'REMINDER', 'TASK');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calendar" (
    "id" UUID NOT NULL,

    CONSTRAINT "Calendar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" VARCHAR(255) NOT NULL,
    "isFullDayEvent" BOOLEAN NOT NULL,
    "type" "EventType" NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CalendarToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CalendarToUser_AB_unique" ON "_CalendarToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CalendarToUser_B_index" ON "_CalendarToUser"("B");

-- AddForeignKey
ALTER TABLE "_CalendarToUser" ADD CONSTRAINT "_CalendarToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Calendar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CalendarToUser" ADD CONSTRAINT "_CalendarToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
