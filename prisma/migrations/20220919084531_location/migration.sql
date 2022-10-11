-- CreateTable
CREATE TABLE "Location" (
    "id" INTEGER NOT NULL,
    "postcode" INTEGER NOT NULL,
    "locality" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);
