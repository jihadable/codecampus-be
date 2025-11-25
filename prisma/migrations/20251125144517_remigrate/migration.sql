/*
  Warnings:

  - You are about to drop the column `wrapper_code_template` on the `programming_languages` table. All the data in the column will be lost.
  - Added the required column `programming_language_id` to the `test_cases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "programming_languages" DROP COLUMN "wrapper_code_template";

-- AlterTable
ALTER TABLE "test_cases" ADD COLUMN     "programming_language_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "wrapper_codes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "problem_id" TEXT NOT NULL,
    "programming_language_id" TEXT NOT NULL,

    CONSTRAINT "wrapper_codes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "test_cases" ADD CONSTRAINT "test_cases_programming_language_id_fkey" FOREIGN KEY ("programming_language_id") REFERENCES "programming_languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wrapper_codes" ADD CONSTRAINT "wrapper_codes_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wrapper_codes" ADD CONSTRAINT "wrapper_codes_programming_language_id_fkey" FOREIGN KEY ("programming_language_id") REFERENCES "programming_languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
