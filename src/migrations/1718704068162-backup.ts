import { MigrationInterface, QueryRunner } from "typeorm";

export class Backup1718704068162 implements MigrationInterface {
    name = 'Backup1718704068162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sport_field" ADD "owner_id" uuid`);
        await queryRunner.query(`ALTER TABLE "sport_field" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "sport_field" ADD "phone" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sport_field" ADD CONSTRAINT "FK_b6fb75537fba43c4922bf5c7d8e" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sport_field" DROP CONSTRAINT "FK_b6fb75537fba43c4922bf5c7d8e"`);
        await queryRunner.query(`ALTER TABLE "sport_field" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "sport_field" ADD "phone" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sport_field" DROP COLUMN "owner_id"`);
    }

}
