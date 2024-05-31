import { Module } from '@nestjs/common';
import { SportFieldService } from './sport-field.service';
import { SportFieldController } from './sport-field.controller';

@Module({
  controllers: [SportFieldController],
  providers: [SportFieldService],
})
export class SportFieldModule {}
