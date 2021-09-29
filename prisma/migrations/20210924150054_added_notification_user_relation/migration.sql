-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,
    "watched" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificaionsOnUsers" (
    "userId" INTEGER NOT NULL,
    "notificationId" INTEGER NOT NULL,
    "watched" BOOLEAN NOT NULL,

    PRIMARY KEY ("userId","notificationId")
);

-- AddForeignKey
ALTER TABLE "NotificaionsOnUsers" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificaionsOnUsers" ADD FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
