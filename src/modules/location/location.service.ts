import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from './entities/province.entity';
import { District } from './entities/district.entity';
import { Ward } from './entities/ward.entity';
import { Location } from './entities/location.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(Ward)
    private wardRepository: Repository<Ward>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<any> {
    try {
      const entity = this.classMapper.map(
        createLocationDto,
        CreateLocationDto,
        Location,
      );
      return this.classMapper.mapAsync(
        await this.locationRepository.save(entity),
        Location,
        CreateLocationDto,
      );
    } catch (ex) {
      throw new Error(`create error: ${ex.message}.`);
    }
  }

  private async findProvinceById(id: string): Promise<Province> {
    return this.provinceRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  private async findDistrictById(id: string): Promise<District> {
    return this.districtRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  private async findWardById(id: string): Promise<Ward> {
    return this.wardRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findAll() {
    const res = await this.locationRepository.find();
    return res ? res : 'No location found!';
  }

  async findOne(id: string) {
    const res = await this.locationRepository.findOne({
      where: {
        id: id,
      },
    });
    return res ? res : 'Location not found!';
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    const entity = this.classMapper.map(
      updateLocationDto,
      UpdateLocationDto,
      Location,
    );

    const res = await this.locationRepository.update(
      {
        id: id,
      },
      entity,
    );

    return res.affected > 0
      ? await this.locationRepository.findOne({
          where: {
            id: id,
          },
        })
      : 'Location not found!';
  }

  async remove(id: string) {
    const res = await this.locationRepository.delete({
      id: id,
    });

    return res.affected > 0
      ? 'Location deleted successfully!'
      : 'Location not found!';
  }

  async findByDistrict(id: string) {
    const res = await this.districtRepository.find({
      where: {
        id: id,
      },
    });

    return res ? res : 'No district found!';
  }

  async findByProvince(id: string) {
    const res = await this.provinceRepository.find({
      where: {
        id: id,
      },
    });

    return res ? res : 'No province found!';
  }

  async findByWard(id: string) {
    const res = await this.wardRepository.find({
      where: {
        id: id,
      },
    });

    return res ? res : 'No ward found!';
  }

  async findAllProvince() {
    const res = await this.provinceRepository.find();
    return res ? res : 'No province found!';
  }

  async findAllDistrict() {
    const res = await this.districtRepository.find();
    return res ? res : 'No district found!';
  }

  async findAllWard() {
    const res = await this.wardRepository.find();
    return res ? res : 'No ward found!';
  }
}
