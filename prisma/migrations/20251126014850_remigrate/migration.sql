/*
  Warnings:

  - A unique constraint covering the columns `[problem_id,programming_language_id]` on the table `wrapper_codes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "wrapper_codes_problem_id_programming_language_id_key" ON "wrapper_codes"("problem_id", "programming_language_id");
