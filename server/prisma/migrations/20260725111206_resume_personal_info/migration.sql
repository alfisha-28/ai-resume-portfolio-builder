-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "achievements" JSONB,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "interests" JSONB,
ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "portfolio" TEXT;
