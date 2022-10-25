import { Dialect } from "sequelize";

export function Configuration () {
  return {
  database: {
    host: process.env.DB_HOST as Dialect,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
}};