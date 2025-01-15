/*
  Warnings:

  - The values [Personal_Care] on the enum `CategoryBeauty` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CategoryBeauty_new" AS ENUM ('Skincare', 'Makeup', 'Hair_Care', 'Fragrances', 'Bath_Body');
ALTER TABLE "beauty" ALTER COLUMN "category" TYPE "CategoryBeauty_new" USING ("category"::text::"CategoryBeauty_new");
ALTER TYPE "CategoryBeauty" RENAME TO "CategoryBeauty_old";
ALTER TYPE "CategoryBeauty_new" RENAME TO "CategoryBeauty";
DROP TYPE "CategoryBeauty_old";
COMMIT;
