import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagEntity } from './entities/tag.entity';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  @ApiOperation({ operationId: 'getTags' })
  @ApiOkResponse({ type: [TagEntity] })
  async findAll() {
    return this.tagsService.findAll();
  }
}
