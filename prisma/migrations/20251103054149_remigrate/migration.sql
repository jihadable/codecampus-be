/*
  Warnings:

  - Added the required column `wrapper_code_template` to the `programming_languages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "programming_languages" ADD COLUMN     "wrapper_code_template" TEXT NOT NULL;
