import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('professores')
class Professores {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  professor: string;

  @Column()
  disciplina: string;

  @Column()
  dia_semana: string;

  @Column()
  periodo: string;

  @Column()
  horario: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Professores;
