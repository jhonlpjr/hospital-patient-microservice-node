import { Patient } from "../domain/entities/patient.entity";


export const patientProviders = [
  {
    provide: 'PATIENT_REPOSITORY',
    useValue: Patient,
  },
];