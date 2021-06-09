import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CriarProfessor1623010982311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'professores',
        columns: [
          {
            name: 'id',
            type: 'uuid', // universal unique id
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'professor',
            type: 'varchar',
          },
          {
            name: 'disciplina',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'dia_semana',
            type: 'varchar',
          },
          {
            name: 'periodo',
            type: 'varchar',
          },
          {
            name: 'horario',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('professores');
  }
}
