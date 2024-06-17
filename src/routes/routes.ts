import express from 'express';
import { AuthMiddleware } from '../middlewares/auth';
import { produtoRoutes } from './produtoRoutes';
import { authRoutes } from './authRoutes';
import { usuarioRoutes } from './usuarioRoutes';
import {orcamentoRoutes} from './orcamentoRoutes';

const routes = express.Router();
const auth = new AuthMiddleware();

routes.use('/auth', authRoutes);
routes.use('/produtos', produtoRoutes);
routes.use('/usuarios',auth.verifyToken, usuarioRoutes);
routes.use('/orcamentos', auth.verifyToken, orcamentoRoutes);


export default routes