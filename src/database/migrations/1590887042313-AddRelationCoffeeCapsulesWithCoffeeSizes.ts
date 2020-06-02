import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class AddRelationCoffeeCapsulesWithCoffeeSizes1590887042313
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'coffee_capsules_coffee_cup_sizes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'coffeeCapsuleId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'coffeeCupSizeId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'coffee_capsules_coffee_cup_sizes',
      new TableForeignKey({
        name: 'CoffeeSizesCoffeeCupSizeCoffeeCapsule',
        columnNames: ['coffeeCapsuleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'coffee_capsules',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'coffee_capsules_coffee_cup_sizes',
      new TableForeignKey({
        name: 'CoffeeSizesCoffeeCapsuleCoffeeCupSize',
        columnNames: ['coffeeCupSizeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'coffee_cup_sizes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'coffee_capsules_coffee_cup_sizes',
      'CoffeeSizesCoffeeCupSizeCoffeeCapsule',
    );

    await queryRunner.dropForeignKey(
      'coffee_capsules_coffee_cup_sizes',
      'CoffeeSizesCoffeeCapsuleCoffeeCupSize',
    );

    await queryRunner.dropTable('coffee_capsules_coffee_cup_sizes');
  }
}
