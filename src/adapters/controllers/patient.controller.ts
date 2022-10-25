import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PatientService } from 'src/application/services/patient.service';
import { CreatePatientReqDto } from 'src/adapters/dto/request/create-patient-req.dto';
import { CreatePatientResDto } from '../dto/response/create-patient-res.dto';

@Controller()
export class PatientController {
  constructor(private readonly service: PatientService) {}

  @MessagePattern({ cmd: 'create_patient' })
  async create(createPatientReqDto: CreatePatientReqDto): Promise<CreatePatientResDto> {
    return this.service.create(createPatientReqDto) as CreatePatientResDto;
  }

  @MessagePattern({ cmd: 'find_all_patients' })
  async findAll() {
    return this.service.findAll();
  }

}
