import { Router } from 'express';

import usuariosRouter from './usuarios.routes';
import agendamentosRouter from './agendamentos.routes';
import sessionsRouter from './sessions.routes';
import professoresRouter from './professores.routes';

const routes = Router();

routes.use('/usuarios', usuariosRouter);
routes.use('/agendamentos', agendamentosRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/professores', professoresRouter);

export default routes;
