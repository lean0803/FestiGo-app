-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" TEXT,
ADD COLUMN     "providerId" TEXT,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "password" SET DEFAULT '';
