import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateFieldDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sportFieldId: string;

  @IsDate()
  @IsNotEmpty()
  createAt: Date;

  @IsString()
  @IsNotEmpty()
  createBy: string;
}
