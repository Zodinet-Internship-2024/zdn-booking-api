import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './entities/province.entity';
import { District } from './entities/district.entity';
import { Ward } from './entities/ward.entity';
import { Location } from './entities/location.entity';
import { LocationProfile } from './location.profile';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Province, District, Ward])],
  controllers: [LocationController],
  providers: [LocationService, LocationProfile],
  exports: [LocationService],
})
export class LocationModule {}
