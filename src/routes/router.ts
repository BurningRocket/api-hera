import express from 'express';
import { produtoRoutes } from './produtoRoutes';

const router = express.Router();

router.use('/produtos', produtoRoutes);

export default router