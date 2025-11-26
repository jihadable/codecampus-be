/*
  Warnings:

  - Added the required column `input_as_json` to the `test_cases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "test_cases" ADD COLUMN     "input_as_json" JSONB NOT NULL;
