import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { BootstrapService } from './bootstrap/bootstrap.service';
import { ConfigModule } from '@nestjs/config';
import { TleUpdateService } from './tle-update/tle-update.service';
import { GroundStationsModule } from './ground-stations/ground-stations.module';
import { TransmittersService } from './transmitters/transmitters.service';
import { SatellitesController } from './satellites/satellites.controller';
import { SatellitesService } from './satellites/satellites.service';
import { AppConfigService } from './app-config/app-config.service';
import { PredictorService } from './predictor/predictor.service';
import { TagsService } from './tags/tags.service';
import { TagsController } from './tags/tags.controller';
import { PassEventsService } from './pass-events/pass-events.service';
import { PassEventsController } from './pass-events/pass-events.controller';
import { BullModule } from '@nestjs/bullmq';
import { PredictorConsumer } from './predictor/predictor.processor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GroundStationsModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'predictor',
    }),
  ],
  controllers: [
    AppController,
    SatellitesController,
    TagsController,
    PassEventsController,
  ],
  providers: [
    AppService,
    PrismaService,
    BootstrapService,
    TleUpdateService,
    TransmittersService,
    SatellitesService,
    AppConfigService,
    PredictorService,
    TagsService,
    PassEventsService,
    PredictorConsumer,
  ],
})
export class AppModule {}
