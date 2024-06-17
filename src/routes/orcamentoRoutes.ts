import express from 'express';
import {OrcamentoService} from '../services/orcamentoService';
import {IOrcamento} from '../models/Orcamento';

const router = express.Router();

const orcamentoService = new OrcamentoService();

router.get('', async (req, res) => {
    try {
        const orcamentos = await orcamentoService.getOrcamentos();
        res.status(200).json(orcamentos);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const orcamento = await orcamentoService.getOrcamentoById(req.params.id);
        res.status(200).json(orcamento);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('', async (req, res) => {
    const orcamento: IOrcamento = req.body;
    try {
        const user = await orcamentoService.createOrcamento(orcamento);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('', async (req, res) => {
    const orcamento: IOrcamento = req.body;
    try {
        const user = await orcamentoService.updateOrcamento(orcamento);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const orcamento = await orcamentoService.deleteOrcamento(req.params.id);
        res.status(200).json(orcamento);
    } catch (error) {
        res.status(400).json(error);
    }
});

export const orcamentoRoutes = router;