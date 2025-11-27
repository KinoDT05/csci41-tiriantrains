-- CreateEnum
CREATE TYPE "Gender_enum" AS ENUM ('Male', 'Female', 'Others');

-- CreateEnum
CREATE TYPE "Train_Type_enum" AS ENUM ('A', 'S');

-- CreateEnum
CREATE TYPE "Location_enum" AS ENUM ('Intertown', 'WestWood');

-- CreateTable
CREATE TABLE "users" (
    "customerID" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "givenName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT 'TestPassword',
    "birthDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("customerID")
);

-- CreateTable
CREATE TABLE "TrainModel" (
    "modelID" TEXT NOT NULL,
    "maxSpeed" INTEGER NOT NULL DEFAULT 0,
    "noSeats" INTEGER NOT NULL DEFAULT 100,
    "noToilets" INTEGER NOT NULL DEFAULT 0,
    "hasRecliningSeats" BOOLEAN NOT NULL DEFAULT false,
    "hasFoldingTables" BOOLEAN NOT NULL DEFAULT false,
    "hasDisabilityAccess" BOOLEAN NOT NULL DEFAULT false,
    "hasLuggageStorage" BOOLEAN NOT NULL DEFAULT false,
    "hasVendingMachines" BOOLEAN NOT NULL DEFAULT false,
    "hasFoodService" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TrainModel_pkey" PRIMARY KEY ("modelID")
);

-- CreateTable
CREATE TABLE "Train" (
    "trainID" SERIAL NOT NULL,
    "trainType" "Train_Type_enum" NOT NULL,
    "trainModelID" TEXT NOT NULL,

    CONSTRAINT "Train_pkey" PRIMARY KEY ("trainID")
);

-- CreateTable
CREATE TABLE "Crew" (
    "crewName" TEXT NOT NULL,
    "inCharge" TEXT NOT NULL,

    CONSTRAINT "Crew_pkey" PRIMARY KEY ("crewName")
);

-- CreateTable
CREATE TABLE "MaintenanceHistory" (
    "maintenanceID" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "maintainedTrainID" INTEGER NOT NULL,
    "maintainer" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "condition" TEXT NOT NULL DEFAULT ' ',

    CONSTRAINT "MaintenanceHistory_pkey" PRIMARY KEY ("maintenanceID")
);

-- CreateTable
CREATE TABLE "Station" (
    "stationName" TEXT NOT NULL,
    "locationList" "Location_enum"[],

    CONSTRAINT "Station_pkey" PRIMARY KEY ("stationName")
);

-- CreateTable
CREATE TABLE "Route" (
    "originID" TEXT NOT NULL,
    "destinationID" TEXT NOT NULL,
    "durationInMinutes" INTEGER NOT NULL DEFAULT 5,
    "cost" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("originID","destinationID")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "scheduleID" SERIAL NOT NULL,
    "originID" TEXT NOT NULL,
    "destinationID" TEXT NOT NULL,
    "trainID" INTEGER NOT NULL,
    "departure" TIMESTAMP(3) NOT NULL,
    "Arrival" TIMESTAMP(3),

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("scheduleID")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticketID" SERIAL NOT NULL,
    "customerID" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketID")
);

-- CreateTable
CREATE TABLE "Itinerary" (
    "itineraryID" SERIAL NOT NULL,
    "scheduleID" INTEGER NOT NULL,
    "ticketID" INTEGER NOT NULL,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("itineraryID")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Train_trainID_key" ON "Train"("trainID");

-- AddForeignKey
ALTER TABLE "Train" ADD CONSTRAINT "Train_trainModelID_fkey" FOREIGN KEY ("trainModelID") REFERENCES "TrainModel"("modelID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceHistory" ADD CONSTRAINT "MaintenanceHistory_maintainer_fkey" FOREIGN KEY ("maintainer") REFERENCES "Crew"("crewName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceHistory" ADD CONSTRAINT "MaintenanceHistory_maintainedTrainID_fkey" FOREIGN KEY ("maintainedTrainID") REFERENCES "Train"("trainID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_originID_fkey" FOREIGN KEY ("originID") REFERENCES "Station"("stationName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_destinationID_fkey" FOREIGN KEY ("destinationID") REFERENCES "Station"("stationName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_originID_destinationID_fkey" FOREIGN KEY ("originID", "destinationID") REFERENCES "Route"("originID", "destinationID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_trainID_fkey" FOREIGN KEY ("trainID") REFERENCES "Train"("trainID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "users"("customerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_scheduleID_fkey" FOREIGN KEY ("scheduleID") REFERENCES "Schedule"("scheduleID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_ticketID_fkey" FOREIGN KEY ("ticketID") REFERENCES "Ticket"("ticketID") ON DELETE RESTRICT ON UPDATE CASCADE;
