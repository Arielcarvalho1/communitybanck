import { User } from "./User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("account")
class Account {

    @PrimaryGeneratedColumn({name: "account_number"}) // This will auto increment int numbers
    accountNumber: string;

    @ManyToOne(() => User, (user) => user.accounts)
    @JoinColumn({name: "account_owner"})
    accountOwner: User;

    @Column({name: "account_balance"})
    accountBalance: number;

    @Column({name: "account_title"})
    accountTitle: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


}

export { Account };