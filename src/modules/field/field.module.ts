import { Module } from '@nestjs/common';
import { FieldService } from './services/field.service';
import { FieldController } from './controllers/field.controller';
import { FieldProfile } from './profile/field.profile';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Field])],
  controllers: [FieldController],
  providers: [FieldService, FieldProfile],
})
export class FieldModule {}
