import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from 'src/adapters/controllers/patient.controller';
import { PatientService } from 'src/application/services/patient.service';

describe('AppController', () => {
  let appController: PatientController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [PatientService],
    }).compile();

    appController = app.get<PatientController>(PatientController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
