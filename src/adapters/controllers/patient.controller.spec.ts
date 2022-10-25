import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { AppModule } from 'src/app.module';
import { PatientService } from 'src/application/services/patient.service';
import { Patient } from 'src/domain/entities/patient.entity';
import { CreatePatientReqDto } from 'src/adapters/dto/request/create-patient-req.dto';
import { CreatePatientResDto } from 'src/adapters/dto/response/create-patient-res.dto';
import { ListPatientResDto } from 'src/adapters/dto/response/list-patient-res.dto';

describe('PatientController', () => {
  let controller: PatientController;
  let service: PatientService;

    //Mock Dto
    const createPatienDto1 = new CreatePatientReqDto();
    createPatienDto1.ID = '10000';
    createPatienDto1.First_name = 'Jon';
    createPatienDto1.Last_name = 'Snow';
    createPatienDto1.Email = 'email@email.com';
    createPatienDto1.Phone = '999777532';
  
    const createPatienDto2 = new CreatePatientReqDto();
    createPatienDto2.ID = '10001';
    createPatienDto2.First_name = 'Tor';
    createPatienDto2.Last_name = 'Fall';
    createPatienDto2.Email = 'email@hotmail.com';
    createPatienDto2.Phone = '981369123';
  
    //Mock List
    const listPatients: Patient[] = [{
      Patient_ID: 1,
      ID : '10000',
      First_name : 'Jon',
      Last_name : 'Snow',
      Email : 'email@email.com',
      Phone : '999777532'
    } as Patient, {
      Patient_ID: 2,
      ID : '10001',
      First_name : 'Tor',
      Last_name : 'Son',
      Email : 'email@hotmail.com',
      Phone : '994465531'
    } as Patient];
  
    //Mock Responses
    const resCreate = (patient: Patient) => new CreatePatientResDto(patient);
    const resList = (list: Array<Patient>) => new ListPatientResDto(list);

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [{
        provide: PatientService,
        useValue: {
          create: jest.fn().mockResolvedValue(resCreate(listPatients[0])),
          findAll: jest.fn().mockResolvedValue(resList(listPatients)),
        }
      }],
    }).compile();

    controller = app.get<PatientController>(PatientController);
    service = app.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('patient.create', () => {
    it('should create a patient', async () => {
      const responseCreate = await controller.create(createPatienDto1);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(responseCreate).toEqual(resCreate(listPatients[0]));
    });
  });

  describe('patient.finAll', () => {
    it('should return list patients', async () => {
      const responseList = await controller.findAll();
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(responseList).toEqual(resList(listPatients));
    });
  });
});
