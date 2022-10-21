import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePatientResDto } from 'src/adapters/dto/response/create-patient-res.dto';
import { CreatePatientReqDto } from 'src/adapters/dto/request/create-patient-req.dto';
import { Patient } from 'src/domain/entities/patient.entity';
import { ListPatientResDto } from 'src/adapters/dto/response/list-patient-res.dto';
import { Response } from 'src/shared/classes/response.class';
import { IResponse } from 'src/shared/interfaces/response.interface';

@Injectable()
export class PatientService {
  constructor(
    @Inject('PATIENT_REPOSITORY')
    private patientRepository: typeof Patient,
  ) {}

  async create(
    createPatientDto: CreatePatientReqDto,
  ): Promise<CreatePatientResDto | Response.Standard<any>> {
    try {
      const patient = await this.patientRepository.create<Patient>({
        ...createPatientDto,
      });
      return new CreatePatientResDto(patient);
    } catch (error) {
      return new Response.Standard<any>({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error',
        data: { error: { name: error['name'], detail: error['errors'] } },
      });
    }
  }

  async findAll(): Promise<ListPatientResDto | Response.Standard<any>> {
    try {
      const patients: Patient[] =
        await this.patientRepository.findAll<Patient>();
      return new ListPatientResDto(patients);
    } catch (error: IResponse.Error | any) {
      return new Response.Standard<any>({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error',
        data: { error: { name: error['name'], detail: error['errors'] } },
      });
    }
  }
}
