import express from 'express';
import { RepresentanteService } from '../services/representanteService';

const router = express.Router();

const representanteService = new RepresentanteService();

router.get('', async (req, res) => {
    const codigo = req.query.codigo ? parseInt(req.query.codigo as string) : undefined;
    const descricao = req.query.descricao ? '%' + req.query.descricao + '%' as string : undefined;

    if (codigo) {
        const representante = await representanteService.getRepresentanteByCodigo(codigo);
        res.status(200).json(representante);
    } else if (descricao) {
        const representantes = await representanteService.getRepresentantesByDescricao(descricao);
        res.status(200).json(representantes);
    } else {
        const representantes = await representanteService.getRepresentantes();
        res.status(200).json(representantes);
    }
});

router.get('/sincronizar', async (req, res) => {
    const representantesCriados = await representanteService.sincronizarRepresentantes();
    res.status(200).json({ message: 'Sincronização realizada com sucesso, ' + representantesCriados + ' representantes provisionados para criação.'});
});

export const representanteRoutes = router;