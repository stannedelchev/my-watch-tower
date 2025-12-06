import { PartialType } from '@nestjs/swagger';
import { CreateGroundStationDto } from './create-ground-station.dto';

export class UpdateGroundStationDto extends PartialType(
  CreateGroundStationDto,
) {}
