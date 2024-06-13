import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1718077314041 implements MigrationInterface {
  name = ' $npmConfigName1718077314041';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_2b67c0363562a428475fdf830fe"`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "created_by" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "created_by" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_2b67c0363562a428475fdf830fe" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
