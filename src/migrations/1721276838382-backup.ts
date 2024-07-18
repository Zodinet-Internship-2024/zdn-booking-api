import { MigrationInterface, QueryRunner } from "typeorm";

export class Backup1721276838382 implements MigrationInterface {
    name = 'Backup1721276838382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_booking_start_end_status"`);
        await queryRunner.query(`DROP INDEX "public"."idx_sport_field_type"`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "start_time" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "end_time" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_6047e430274bb345b9437cb937c"`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "ward_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_90543bacf107cdd564e9b62cd20"`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "receiver_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_6047e430274bb345b9437cb937c" FOREIGN KEY ("ward_id") REFERENCES "ward"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_90543bacf107cdd564e9b62cd20" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_90543bacf107cdd564e9b62cd20"`);
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_6047e430274bb345b9437cb937c"`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "receiver_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_90543bacf107cdd564e9b62cd20" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "ward_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_6047e430274bb345b9437cb937c" FOREIGN KEY ("ward_id") REFERENCES "ward"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "end_time" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "start_time" DROP DEFAULT`);
        await queryRunner.query(`CREATE INDEX "idx_sport_field_type" ON "sport_field" ("sport_field_type_id") `);
        await queryRunner.query(`CREATE INDEX "idx_booking_start_end_status" ON "booking" ("status", "start_time", "end_time") `);
    }

}
