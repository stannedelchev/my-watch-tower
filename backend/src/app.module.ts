import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroundStationsController } from './ground-stations/ground-stations.controller';

@Module({
  imports: [],
  controllers: [AppController, GroundStationsController],
  providers: [AppService],
})
export class AppModule {}
