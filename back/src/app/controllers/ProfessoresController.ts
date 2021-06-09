/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Professores from '../models/Professores';

interface Request {
  professor: string;
  disciplina: string;
  dia_semana: string;
  periodo: string;
  horario: string;
}
interface ProfessoresUpdate {
  id: string;
  professor: string;
  disciplina: string;
  dia_semana: string;
  periodo: string;
  horario: string;
}

class ProfessoressController {
  public async store({
    professor,
    disciplina,
    dia_semana,
    periodo,
    horario,
  }: Request): Promise<Professores> {
    const usuariosRepository = getRepository(Professores);

    const verificaUsuarioExiste = await usuariosRepository.findOne({
      where: { professor },
    });

    if (verificaUsuarioExiste) {
      throw new AppError('Já existe um professor com esse nome');
    }

    const user = usuariosRepository.create({
      professor,
      disciplina,
      dia_semana,
      periodo,
      horario,
    });

    await usuariosRepository.save(user);

    return user;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public async update({
    id,
    disciplina,
    professor,
    dia_semana,
    periodo,
    horario,
  }: ProfessoresUpdate) {
    const professoresRepository = getRepository(Professores);

    const professores = await professoresRepository.findOne({ id });

    if (!professores) {
      throw new AppError('id do professor não foi encontrada !');
    }

    let valuesCheck = [professor, disciplina, dia_semana, periodo, horario];
    let ProfNewArray = [
      professores.professor,
      professores.disciplina,
      professores.dia_semana,
      professores.periodo,
      professores.horario,
    ];

    // eslint-disable-next-line no-restricted-syntax
    for (let i in valuesCheck) {
      if (valuesCheck[i] === undefined || valuesCheck[i] === '') {
        valuesCheck[i] = ProfNewArray[i];
      }
    }

    professor = valuesCheck[0];
    disciplina = valuesCheck[1];
    dia_semana = valuesCheck[2];
    periodo = valuesCheck[3];
    horario = valuesCheck[4];

    await professoresRepository.update(
      { id },
      { professor, disciplina, dia_semana, periodo, horario },
    );

    const professoresUpdated = await professoresRepository.findOne({ id });

    return professoresUpdated;
  }
}

export default ProfessoressController;
