import { Module } from '@nestjs/common';
import { PatientController } from './adapters/controllers/patient.controller';
import { PatientService } from './application/services/patient.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './domain/entities/patient.entity';
import { Configuration } from './shared/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.pass'),
        database: configService.get<string>('database.name'),
        synchronize: true,
        autoLoadModels: true,
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([Patient]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class AppModule {}
