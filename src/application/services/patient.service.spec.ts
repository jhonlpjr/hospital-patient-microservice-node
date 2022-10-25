import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from 'src/application/services/patient.service';
import { Patient } from 'src/domain/entities/patient.entity';
import { CreatePatientReqDto } from 'src/adapters/dto/request/create-patient-req.dto';
import { CreatePatientResDto } from 'src/adapters/dto/response/create-patient-res.dto';
import { ListPatientResDto } from 'src/adapters/dto/response/list-patient-res.dto';
import { getModelToken } from '@nestjs/sequelize';

describe('PatientController', () => {
  let service: PatientService;
  let model: typeof Patient;

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
  const listPatients: Patient[] = [
    {
      Patient_ID: 1,
      ID: '10000',
      First_name: 'Jon',
      Last_name: 'Snow',
      Email: 'email@email.com',
      Phone: '999777532',
    } as Patient,
    {
      Patient_ID: 2,
      ID: '10001',
      First_name: 'Tor',
      Last_name: 'Son',
      Email: 'email@hotmail.com',
      Phone: '994465531',
    } as Patient,
  ];

  //Mock Responses
  const resCreate = (patient: Patient) => new CreatePatientResDto(patient);
  const resList = (list: Array<Patient>) => new ListPatientResDto(list);

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          //Mock Model
          provide: getModelToken(Patient),
          useValue: {
            create: jest.fn().mockResolvedValue(listPatients[0]),
            findAll: jest.fn().mockResolvedValue(listPatients),
          },
        },
      ],
    }).compile();

    service = app.get<PatientService>(PatientService);
    model = app.get<typeof Patient>(getModelToken(Patient));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('patient.create', () => {
    it('should create a patient', async () => {
      const responseCreate = await service.create(createPatienDto1);
      console.log('Muestra1:', responseCreate);
      expect(model.create).toHaveBeenCalledTimes(1);
      expect(responseCreate).toEqual(resCreate(listPatients[0]));
    });
  });

  describe('patient.finAll', () => {
    it('should return list patients', async () => {
      const responseList = await service.findAll();
      console.log('Muestra List:', responseList);
      expect(model.findAll).toHaveBeenCalledTimes(1);
      expect(responseList).toEqual(resList(listPatients));
    });
  });
});
