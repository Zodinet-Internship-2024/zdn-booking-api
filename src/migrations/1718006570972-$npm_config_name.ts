import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1718006570972 implements MigrationInterface {
    name = ' $npmConfigName1718006570972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "district" DROP COLUMN "province_id"`);
        await queryRunner.query(`ALTER TABLE "ward" DROP COLUMN "district_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "field" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "field" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sport_field_image" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sport_field_image" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sport_field_type" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sport_field_type" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sport_field" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sport_field" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "image_url" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "image_url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sport_field" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sport_field" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sport_field_type" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sport_field_type" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sport_field_image" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sport_field_image" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "field" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "field" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ward" ADD "district_id" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "district" ADD "province_id" text NOT NULL`);
    }

}
