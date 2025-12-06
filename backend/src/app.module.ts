import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { BootstrapService } from './bootstrap/bootstrap.service';
import { ConfigModule } from '@nestjs/config';
import { TleUpdateService } from './tle-update/tle-update.service';
import { GroundStationsModule } from './ground-stations/ground-stations.module';
import { TransmittersUpdateService } from './transmitters-update/transmitters-update.service';
import { SatellitesController } from './satellites/satellites.controller';
import { SatellitesService } from './satellites/satellites.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GroundStationsModule],
  controllers: [AppController, SatellitesController],
  providers: [AppService, PrismaService, BootstrapService, TleUpdateService, TransmittersUpdateService, SatellitesService],
})
export class AppModule {}
