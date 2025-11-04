/*
  Warnings:

  - Added the required column `function_name` to the `problems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "problems" ADD COLUMN     "function_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "submissions" ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT NOT NULL;
