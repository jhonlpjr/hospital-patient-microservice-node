import { Patient } from "../entities/patient.entity";


export const PatientProvider = [
  {
    provide: 'PATIENT_REPOSITORY',
    useValue: Patient,
  },
];