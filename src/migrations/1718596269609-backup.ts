import { MigrationInterface, QueryRunner } from 'typeorm';

export class Backup1718596269609 implements MigrationInterface {
  name = 'Backup1718596269609';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ALTER COLUMN "created_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ALTER COLUMN "updated_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "field" ALTER COLUMN "created_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "field" ALTER COLUMN "updated_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" ALTER COLUMN "created_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" ALTER COLUMN "updated_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ALTER COLUMN "created_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ALTER COLUMN "updated_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" ALTER COLUMN "created_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" ALTER COLUMN "updated_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ALTER COLUMN "created_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ALTER COLUMN "updated_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ALTER COLUMN "created_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ALTER COLUMN "updated_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "created_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updated_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "image_url" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "image_url" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updated_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "created_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ALTER COLUMN "updated_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ALTER COLUMN "created_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ALTER COLUMN "updated_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ALTER COLUMN "created_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" ALTER COLUMN "updated_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" ALTER COLUMN "created_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ALTER COLUMN "updated_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ALTER COLUMN "created_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" ALTER COLUMN "updated_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" ALTER COLUMN "created_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "field" ALTER COLUMN "updated_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "field" ALTER COLUMN "created_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ALTER COLUMN "updated_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ALTER COLUMN "created_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying(64) NOT NULL`,
    );
  }
}
