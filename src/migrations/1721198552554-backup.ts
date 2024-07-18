import { MigrationInterface, QueryRunner } from "typeorm";

export class Backup1721198552554 implements MigrationInterface {
    name = 'Backup1721198552554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_booking_start_end_status"`);
        await queryRunner.query(`DROP INDEX "public"."idx_sport_field_type"`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" uuid NOT NULL, "updated_by" uuid, "deleted_by" uuid, "title" character varying(255) NOT NULL, "description" character varying(255), "metadata" jsonb, "receiver_id" uuid NOT NULL, "is_read" boolean DEFAULT false, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_6047e430274bb345b9437cb937c"`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "ward_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_6047e430274bb345b9437cb937c" FOREIGN KEY ("ward_id") REFERENCES "ward"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_90543bacf107cdd564e9b62cd20" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_90543bacf107cdd564e9b62cd20"`);
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_6047e430274bb345b9437cb937c"`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "ward_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_6047e430274bb345b9437cb937c" FOREIGN KEY ("ward_id") REFERENCES "ward"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`CREATE INDEX "idx_sport_field_type" ON "sport_field" ("sport_field_type_id") `);
        await queryRunner.query(`CREATE INDEX "idx_booking_start_end_status" ON "booking" ("start_time", "end_time", "status") `);
    }

}
