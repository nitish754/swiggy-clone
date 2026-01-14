-- CreateEnum
CREATE TYPE "DEVICE" AS ENUM ('WEB', 'ANDROID', 'IOS');

-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "device" "DEVICE" NOT NULL DEFAULT 'WEB';
