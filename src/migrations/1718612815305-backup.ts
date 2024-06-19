import { MigrationInterface, QueryRunner } from 'typeorm';

export class Backup1718612815305 implements MigrationInterface {
  name = 'Backup1718612815305';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "booking" ADD "created_by" uuid`);
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "booking" ADD "updated_by" uuid`);
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "deleted_by"`);
    await queryRunner.query(`ALTER TABLE "booking" ADD "deleted_by" uuid`);
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "field" ADD "created_by" uuid`);
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "field" ADD "updated_by" uuid`);
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "deleted_by"`);
    await queryRunner.query(`ALTER TABLE "field" ADD "deleted_by" uuid`);
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "location" ADD "created_by" uuid`);
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "location" ADD "updated_by" uuid`);
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "deleted_by"`);
    await queryRunner.query(`ALTER TABLE "location" ADD "deleted_by" uuid`);
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD "created_by" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP COLUMN "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD "updated_by" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD "deleted_by" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" ADD "created_by" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" DROP COLUMN "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" ADD "updated_by" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" ADD "deleted_by" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(`ALTER TABLE "sport_field" ADD "created_by" uuid`);
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP COLUMN "updated_by"`,
    );
    await queryRunner.query(`ALTER TABLE "sport_field" ADD "updated_by" uuid`);
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(`ALTER TABLE "sport_field" ADD "deleted_by" uuid`);
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "account" ADD "created_by" uuid`);
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "account" ADD "updated_by" uuid`);
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "deleted_by"`);
    await queryRunner.query(`ALTER TABLE "account" ADD "deleted_by" uuid`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "created_by" uuid`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "updated_by" uuid`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_by"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "deleted_by" uuid`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_by"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "deleted_by" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_by"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updated_by" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "created_by" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "deleted_by"`);
    await queryRunner.query(
      `ALTER TABLE "account" ADD "deleted_by" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "updated_by"`);
    await queryRunner.query(
      `ALTER TABLE "account" ADD "updated_by" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "account" ADD "created_by" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ADD "deleted_by" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP COLUMN "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ADD "updated_by" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ADD "created_by" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" ADD "deleted_by" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" DROP COLUMN "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" ADD "updated_by" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" ADD "created_by" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD "deleted_by" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP COLUMN "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD "updated_by" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD "created_by" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "deleted_by"`);
    await queryRunner.query(
      `ALTER TABLE "location" ADD "deleted_by" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "updated_by"`);
    await queryRunner.query(
      `ALTER TABLE "location" ADD "updated_by" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "location" ADD "created_by" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "deleted_by"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "deleted_by" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "updated_by"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "updated_by" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "created_by" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "deleted_by"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "deleted_by" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "updated_by"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "updated_by" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "created_by" character varying`,
    );
  }
}
