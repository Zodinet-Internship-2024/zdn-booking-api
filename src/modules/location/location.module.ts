import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Province } from './entities/province.entity';
// import { District } from './entities/district.entity';
// import { Ward } from './entities/ward.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([Province, District, Ward])],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
