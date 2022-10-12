-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "projectID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "rewardID" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_rewardID_fkey" FOREIGN KEY ("rewardID") REFERENCES "ProjectReward"("id") ON DELETE SET NULL ON UPDATE CASCADE;
