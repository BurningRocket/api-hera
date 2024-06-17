import express from 'express';
import {SecoesSiteService} from '../services/secoesSiteService';
import {ISecoesSite} from '../models/SecoesSite';

const router = express.Router();

const secoesSiteService = new SecoesSiteService();

router.get('', async (req, res) => {
    try {
        const secoesSites = await secoesSiteService.getSecoesSites();
        res.status(200).json(secoesSites);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/titulo/:titulo', async (req, res) => {
    try {
        const secoesSite = await secoesSiteService.getSecoesSiteByTitulo(req.params.titulo);
        res.status(200).json(secoesSite);
    } catch (error) {
        res.status(400).json(error);
    }

});

router.get('/:id', async (req, res) => {
    try {
        const secoesSite = await secoesSiteService.getSecoesSiteById(req.params.id);
        res.status(200).json(secoesSite);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('', async (req, res) => {
    const secoesSite: ISecoesSite = req.body;
    try {
        const user = await secoesSiteService.createSecoesSite(secoesSite);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('', async (req, res) => {
    const secoesSite: ISecoesSite = req.body;
    try {
        const user = await secoesSiteService.updateSecoesSite(secoesSite);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const secoesSite = await secoesSiteService.deleteSecoesSite(req.params.id);
        res.status(200).json(secoesSite);
    } catch (error) {
        res.status(400).json(error);
    }
});

export const secoesSiteRoutes = router;