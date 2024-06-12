import express from 'express';
import { AuthMiddleware } from '../middlewares/auth';
import { produtoRoutes } from './produtoRoutes';
import { authRoutes } from './authRoute';
import { usuarioRoutes } from './usuarioRoutes';

const routes = express.Router();
const auth = new AuthMiddleware();

routes.use('/auth', authRoutes);
routes.use('/produtos', auth.verifyToken, produtoRoutes);
routes.use('/usuarios',auth.verifyToken, usuarioRoutes);


export default routes