import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAccounts1673960269349 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "account",
                columns: [
                    {
                        name: "account_number",
                        type: "int",
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: "account_owner",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "account_balance",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "account_title",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_accounts",
                        referencedTableName: "user",
                        referencedColumnNames: ["user_id"],
                        columnNames: ["account_owner"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("account");
    }

}
