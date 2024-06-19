import { MigrationInterface, QueryRunner } from "typeorm";

export class Backup1718613499073 implements MigrationInterface {
    name = 'Backup1718613499073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sport_field" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "sport_field" ADD "startTime" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sport_field" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "sport_field" ADD "endTime" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sport_field" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "sport_field" ADD "endTime" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sport_field" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "sport_field" ADD "startTime" TIMESTAMP NOT NULL`);
    }

}
