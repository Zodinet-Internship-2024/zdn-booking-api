import { District } from 'src/modules/location/entities/district.entity';
import { define } from 'typeorm-seeding';

define(District, () => {
  const district = new District();
  district.id = '-1';
  district.name = 'Quận 1';
  return district;
});
