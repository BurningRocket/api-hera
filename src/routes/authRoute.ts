import express from 'express';
import { AuthService } from '../services/authService';
import { IUsuario } from '../models/Usuario';

const router = express.Router();

const authService = new AuthService();

router.post('/login', async (req, res) => {
    const usuario: IUsuario = req.body;
    try {
        const user = await authService.login(usuario);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/register', async (req, res) => {
    const usuario: IUsuario = req.body;
    try {
        const user = await authService.register(usuario);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

export const    authRoutes = router;