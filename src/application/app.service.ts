import { Inject, Injectable } from '@nestjs/common';
import { CreatePatientDto } from '../domain/dto/create-patient.dto';
import { Patient } from '../domain/entities/patient.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('PATIENT_REPOSITORY')
    private patientRepository: typeof Patient,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    console.log('Muestra dto que llega al microservicio:', createPatientDto);
    const patient = await this.patientRepository.create<Patient>({...createPatientDto});
    console.log('Muestra respuesta al crear:', createPatientDto);
    return  patient;
  }

  async findAll(): Promise<Patient[]> {
    const patients = await this.patientRepository.findAll<Patient>();
    console.log('Muestra pacientes:', patients)
    return patients;
  }
  
  getHello(): string {
    return 'Hello World!';
  }
}
