import express from 'express';
import { ProdutoService } from '../services/produtoService';

const router = express.Router();

const produtoService = new ProdutoService();

router.get('', async (req, res) => {
    const codigo = req.query.codigo ? parseInt(req.query.codigo as string) : undefined;
    const descricao = req.query.descricao ? '%' + req.query.descricao + '%' as string : undefined;

    if (codigo) {
        const produto = await produtoService.getProdutoByCodigo(codigo);
        res.status(200).json(produto);
    } else if (descricao) {
        const produtos = await produtoService.getProdutosByDescricao(descricao);
        res.status(200).json(produtos);
    } else {
        const produtos = await produtoService.getProdutos();
        res.status(200).json(produtos);
    }
});

export const produtoRoutes = router;