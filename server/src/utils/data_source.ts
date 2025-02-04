import "reflect-metadata";

import { DataSource } from "typeorm";

export const AppDataSourceTypeORM = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "DB",
  synchronize: true,
  logging: true,
  acquireTimeout: 60000,
  connectTimeout: 30000,
  entities: ["src/entities/*.ts"],
  migrations: [],
  subscribers: []
});
