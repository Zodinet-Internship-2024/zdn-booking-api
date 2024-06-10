import { MigrationInterface, QueryRunner } from 'typeorm';

export class Backup1717756756331 implements MigrationInterface {
  name = 'Backup1717756756331';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "location" DROP CONSTRAINT "FK_7b1b0bf31da965a4491b9f17577"`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" DROP CONSTRAINT "FK_737b1dcec23ff780fbf917517e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" DROP CONSTRAINT "FK_d7563caa4ccbb2dc52c12dc64ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP CONSTRAINT "FK_fbb87fa1d4f02afc63db0a66579"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP CONSTRAINT "FK_e0e0b530b02357a678b0a7e86af"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP CONSTRAINT "FK_8d4a75c19ba41705cb018ca80f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP CONSTRAINT "FK_09f94235b9f719aa696a5da07a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP CONSTRAINT "FK_7ea7add4913868ce81297adefdc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP CONSTRAINT "FK_1983ec8b8a6e0daf0abe12bbe82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_9f12e8ffb17cc4b4deeadb93401"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_14f88efd4d31eafab6a62cc62cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_f6e3fba2c8b88432e56d4268f13"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_d2f5e343630bd8b7e1e7534e82e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_6bfae5ab9f39212d5b6ad0276b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_7dda804b73a73af1c4fcab9a5bc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" ADD "created_by" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" ADD "updated_at" TIMESTAMP DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" ADD "updated_by" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" ADD "deleted_by" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "created_by" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "updated_at" TIMESTAMP DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "updated_by"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "updated_by" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "deleted_by"`);
    await queryRunner.query(`ALTER TABLE "booking" ADD "deleted_by" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "created_by" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "updated_at" TIMESTAMP DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "updated_by"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "updated_by" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "field" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "deleted_by"`);
    await queryRunner.query(`ALTER TABLE "field" ADD "deleted_by" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "location" ADD "created_by" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "updated_by"`);
    await queryRunner.query(
      `ALTER TABLE "location" ADD "updated_by" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "deleted_by"`);
    await queryRunner.query(
      `ALTER TABLE "location" ADD "deleted_by" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD "created_by" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD "updated_at" TIMESTAMP DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP COLUMN "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD "updated_by" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD "deleted_by" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ADD "created_by" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ADD "updated_at" TIMESTAMP DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP COLUMN "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ADD "updated_by" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ADD "deleted_by" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "account" ADD "created_by" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "updated_by"`);
    await queryRunner.query(
      `ALTER TABLE "account" ADD "updated_by" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "deleted_by"`);
    await queryRunner.query(`ALTER TABLE "account" ADD "deleted_by" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "created_by" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_by"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updated_by" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_by"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "deleted_by" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD CONSTRAINT "FK_5b6290b077f8ae85494f17e9279" FOREIGN KEY ("sport_field_id") REFERENCES "sport_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "field" DROP CONSTRAINT "FK_5b6290b077f8ae85494f17e9279"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_by"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "deleted_by" uuid`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "updated_by" uuid`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "created_by" uuid`);
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "deleted_by"`);
    await queryRunner.query(`ALTER TABLE "account" ADD "deleted_by" uuid`);
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "account" ADD "updated_by" uuid`);
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "account" ADD "created_by" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(`ALTER TABLE "sport_field" ADD "deleted_by" uuid`);
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP COLUMN "updated_by"`,
    );
    await queryRunner.query(`ALTER TABLE "sport_field" ADD "updated_by" uuid`);
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(`ALTER TABLE "sport_field" ADD "created_by" uuid`);
    await queryRunner.query(
      `ALTER TABLE "sport_field" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD "deleted_by" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP COLUMN "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD "updated_by" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD "created_by" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "deleted_by"`);
    await queryRunner.query(`ALTER TABLE "location" ADD "deleted_by" uuid`);
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "location" ADD "updated_by" uuid`);
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "location" ADD "created_by" uuid`);
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "deleted_by"`);
    await queryRunner.query(`ALTER TABLE "field" ADD "deleted_by" uuid`);
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "deleted_at"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "deleted_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "field" ADD "updated_by" uuid`);
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "created_by" uuid NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "field" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "deleted_by"`);
    await queryRunner.query(`ALTER TABLE "booking" ADD "deleted_by" uuid`);
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "booking" ADD "updated_by" uuid`);
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "created_by" uuid NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" DROP COLUMN "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_type" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_7dda804b73a73af1c4fcab9a5bc" FOREIGN KEY ("deleted_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_6bfae5ab9f39212d5b6ad0276b1" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_d2f5e343630bd8b7e1e7534e82e" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_f6e3fba2c8b88432e56d4268f13" FOREIGN KEY ("deleted_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_14f88efd4d31eafab6a62cc62cc" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_9f12e8ffb17cc4b4deeadb93401" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ADD CONSTRAINT "FK_1983ec8b8a6e0daf0abe12bbe82" FOREIGN KEY ("deleted_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ADD CONSTRAINT "FK_7ea7add4913868ce81297adefdc" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field" ADD CONSTRAINT "FK_09f94235b9f719aa696a5da07a7" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD CONSTRAINT "FK_8d4a75c19ba41705cb018ca80f2" FOREIGN KEY ("deleted_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD CONSTRAINT "FK_e0e0b530b02357a678b0a7e86af" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sport_field_image" ADD CONSTRAINT "FK_fbb87fa1d4f02afc63db0a66579" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" ADD CONSTRAINT "FK_d7563caa4ccbb2dc52c12dc64ae" FOREIGN KEY ("deleted_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" ADD CONSTRAINT "FK_737b1dcec23ff780fbf917517e0" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" ADD CONSTRAINT "FK_7b1b0bf31da965a4491b9f17577" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
