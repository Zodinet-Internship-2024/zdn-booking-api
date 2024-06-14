import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_BEARER_AUTH, ROLE } from 'src/constants/constants';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationService } from './location.service';
import { Roles } from 'nest-keycloak-connect';
@ApiTags('location')
@Controller('location')
@ApiBearerAuth(API_BEARER_AUTH)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  @Roles({
    roles: [ROLE.USER],
  })
  findAll() {
    return this.locationService.findAll();
  }

  @Get('provinces')
  findAllProvince() {
    return this.locationService.findAllProvince();
  }

  @Get('districts')
  findAllDistrict() {
    return this.locationService.findAllDistrict();
  }

  @Get('ward')
  findAllWard() {
    return this.locationService.findAllWard();
  }

  @Get('province/:id')
  findByProvince(@Param('id') id: string) {
    return this.locationService.findByProvince(id);
  }

  @Get('district/:id')
  findByDistrict(@Param('id') id: string) {
    return this.locationService.findByDistrict(id);
  }

  @Get('ward/:id')
  findByWard(@Param('id') id: string) {
    return this.locationService.findByWard(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }
}
