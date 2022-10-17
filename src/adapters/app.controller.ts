import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from '../application/app.service';
import { CreatePatientDto } from '../domain/dto/create-patient.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create_patient'})
  async create(createPatientDto: CreatePatientDto) {
    return this.appService.create(createPatientDto);
  }

  @MessagePattern({ cmd: 'find_all_patients' })
  async findAll() {
    return this.appService.findAll();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
