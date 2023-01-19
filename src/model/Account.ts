import { User } from "./User";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("account")
class Account {

    @PrimaryGeneratedColumn({name: "account_number"}) // This will auto increment int numbers
    accountNumber: string;

    @ManyToOne(() => User, (user) => user.accounts)
    @JoinColumn({name: "account_owner"})
    accountOwner: User;

    @Column({name: "account_balance"})
    accountBalance: number;

    @Column({name: "account_balance"})
    accountTitle: string;


}

export { Account };