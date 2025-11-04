/*
  Warnings:

  - Added the required column `status` to the `problem_suggestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problem_id` to the `submissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "problem_suggestions" ADD COLUMN     "status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "submissions" ADD COLUMN     "problem_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
