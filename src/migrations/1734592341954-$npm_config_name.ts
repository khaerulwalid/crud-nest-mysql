import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class  $npmConfigName1734592341954 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'category',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'name',
                    type: 'varchar'
                }
            ]
        }))

        await queryRunner.createTable(new Table({
            name: 'product',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'price',
                    type: 'int',
                },
                {
                    name: 'categoryId',
                    type: 'int'
                }
            ]
        }));

        await queryRunner.createForeignKey('product', new TableForeignKey({
            columnNames: ['categoryId'],
            referencedTableName: 'category',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('product');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('categoryId') !== -1);
        await queryRunner.dropForeignKey('product', foreignKey);
        await queryRunner.dropTable('product');
        await queryRunner.dropTable('category');
    }

}
