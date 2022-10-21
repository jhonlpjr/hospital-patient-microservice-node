import { Module } from '@nestjs/common';
import { PatientController } from './adapters/controllers/patient.controller';
import { PatientService } from './application/services/patient.service';
import { PatientProvider } from './domain/repository/patient.provider';
import { DatabaseModule } from './adapters/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [PatientController],
  providers: [PatientService, ...PatientProvider],
})
export class AppModule {}
