import "reflect-metadata"
import { DataSource } from "typeorm"
import { Account } from "./model/Account";
import { User } from "./model/User"

export const sqliteDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Account],
    migrations: ["src/migration/**/*{.ts,.js}"],
    subscribers: [],
});