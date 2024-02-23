-- CreateTable
CREATE TABLE "ListItems" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ListItems_pkey" PRIMARY KEY ("id")
);
