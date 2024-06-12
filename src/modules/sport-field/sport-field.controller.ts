import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SportFieldService } from './sport-field.service';
import { CreateSportFieldDto } from './dto/create-sport-field.dto';
import { UpdateSportFieldDto } from './dto/update-sport-field.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_BEARER_AUTH } from 'src/constants/constants';
@ApiTags('sport-field')
@Controller('sport-field')
@ApiBearerAuth(API_BEARER_AUTH)
export class SportFieldController {
  constructor(private readonly sportFieldService: SportFieldService) {}

  @Post()
  create(@Body() createSportFieldDto: CreateSportFieldDto) {
    return this.sportFieldService.create(createSportFieldDto);
  }

  @Get()
  findAll() {
    return this.sportFieldService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sportFieldService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSportFieldDto: UpdateSportFieldDto,
  ) {
    return this.sportFieldService.update(+id, updateSportFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sportFieldService.remove(+id);
  }
}
