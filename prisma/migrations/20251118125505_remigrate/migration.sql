/*
  Warnings:

  - Added the required column `file_name` to the `programming_languages` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `submissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('Accepted', 'Wrong_Answer', 'Runtime_Error');

-- AlterTable
ALTER TABLE "programming_languages" ADD COLUMN     "file_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "submissions" DROP COLUMN "status",
ADD COLUMN     "status" "SubmissionStatus" NOT NULL;
