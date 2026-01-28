-- CreateIndex
CREATE INDEX "RefreshToken_userId_device_idx" ON "RefreshToken"("userId", "device");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
