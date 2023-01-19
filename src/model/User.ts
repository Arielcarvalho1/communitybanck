import "reflect-metadata"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Account } from "./Account";

@Entity("user")
class User {

    @PrimaryColumn({name: "user_id"})
    readonly userId: string;

    @Column({name: "owner_name"})
    name: string;

    @Column({name: "login"})
    login: string;

    @Column({name: "password"})
    password: string;

    @Column({name: "total_accounts"})
    totalAccounts: number;

    @OneToMany(() => Account, (account) => account.accountOwner, {cascade: true})
    accounts: Account[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(name: string, login: string, hashedPassword: string, totalAccounts: number, accounts: Account[]) {
        if(!this.userId) {
            this.userId = uuid();
        }

        this.name = name;
        this.login = login;
        this.password = hashedPassword;
        this.totalAccounts = totalAccounts;
        this.accounts = accounts;
    }


}

export { User };