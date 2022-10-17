import { Module } from '@nestjs/common';
import { AppController } from './adapters/app.controller';
import { AppService } from './application/app.service';
import { patientProviders } from './application/patient.provider';
import { DatabaseModule } from './config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService, ...patientProviders],
})
export class AppModule {}
