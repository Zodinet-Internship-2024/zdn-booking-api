import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1717404203711 implements MigrationInterface {
  name = ' $npmConfigName1717404203711';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "created_at" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "updated_at" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ALTER COLUMN "deleted_at" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "created_at" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "updated_at" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "deleted_at"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "deleted_at" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_2b67c0363562a428475fdf830fe" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_9fd6714f7283e2d6a0052f4bf69" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_adeb73c1d1b51edd7a579561b1f" FOREIGN KEY ("deleted_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "field" ADD CONSTRAINT "FK_5b6290b077f8ae85494f17e9279" FOREIGN KEY ("sport_field_id") REFERENCES "sport_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "field" ADD CONSTRAINT "FK_373cb5a1613999392843b1e3dc5" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "field" ADD CONSTRAINT "FK_929191e67cbcbd8319652247651" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "field" ADD CONSTRAINT "FK_0c271dda5a301bf334b5ca94054" FOREIGN KEY ("deleted_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "field" DROP CONSTRAINT "FK_0c271dda5a301bf334b5ca94054"`,
    );
    await queryRunner.query(
      `ALTER TABLE "field" DROP CONSTRAINT "FK_929191e67cbcbd8319652247651"`,
    );
    await queryRunner.query(
      `ALTER TABLE "field" DROP CONSTRAINT "FK_373cb5a1613999392843b1e3dc5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "field" DROP CONSTRAINT "FK_5b6290b077f8ae85494f17e9279"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_adeb73c1d1b51edd7a579561b1f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_9fd6714f7283e2d6a0052f4bf69"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_2b67c0363562a428475fdf830fe"`,
    );
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "deleted_at"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "deleted_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ALTER COLUMN "deleted_at" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
  }
}
