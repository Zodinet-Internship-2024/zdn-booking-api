import { Injectable } from '@nestjs/common';
import { CreateSportFieldDto } from './dto/create-sport-field.dto';
import { UpdateSportFieldDto } from './dto/update-sport-field.dto';

@Injectable()
export class SportFieldService {
  create(createSportFieldDto: CreateSportFieldDto) {
    return 'This action adds a new sportField';
  }

  findAll() {
    return `This action returns all sportField`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sportField`;
  }

  update(id: number, updateSportFieldDto: UpdateSportFieldDto) {
    return `This action updates a #${id} sportField`;
  }

  remove(id: number) {
    return `This action removes a #${id} sportField`;
  }
}
