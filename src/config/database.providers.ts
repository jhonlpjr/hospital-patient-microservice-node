import { Sequelize } from 'sequelize-typescript';
import { Patient } from '../domain/entities/patient.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 8082,
        username: 'admin',
        password: '123456',
        database: 'hospital',
      });
      sequelize.addModels([Patient]);
      await sequelize.sync();
      return sequelize;
    },
  },
];