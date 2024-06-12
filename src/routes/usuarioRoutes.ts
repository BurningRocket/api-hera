import express from 'express';
import {UsuarioService} from '../services/usuarioService';
import {IUsuario} from '../models/Usuario';

const router = express.Router();

const usuarioService = new UsuarioService();

router.get('', async (req, res) => {
    try {
        const usuarios = await usuarioService.getUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const usuario = await usuarioService.getUsuarioById(req.params.id);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('', async (req, res) => {
    const usuario: IUsuario = req.body;
    try {
        const user = await usuarioService.createUsuario(usuario);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('', async (req, res) => {
    const usuario: IUsuario = req.body;
    try {
        const user = await usuarioService.updateUsuario(usuario);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const usuario = await usuarioService.deleteUsuario(req.params.id);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json(error);
    }
});

export const usuarioRoutes = router;