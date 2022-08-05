-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('ARTS', 'FILM', 'FOOD', 'RETAIL', 'NIGHTLIFE', 'TECHNOLOGY', 'GAMES', 'MUSIC', 'OTHER');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,
    "targetFunding" DOUBLE PRECISION NOT NULL,
    "currentFunding" DOUBLE PRECISION NOT NULL,
    "area" TEXT NOT NULL,
    "postcode" INTEGER NOT NULL,
    "aboutBusiness" TEXT,
    "aboutOwner" TEXT,
    "businessPlan" TEXT,
    "categories" "Categories"[],
    "images" TEXT[],
    "attachments" TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectReward" (
    "id" TEXT NOT NULL,
    "projectID" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProjectReward_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectReward" ADD CONSTRAINT "ProjectReward_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
