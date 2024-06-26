import express from 'express';
import { ProdutoService } from '../services/produtoService';

const router = express.Router();

const produtoService = new ProdutoService();

router.get('', async (req, res) => {
    const codigo = req.query.codigo ? parseInt(req.query.codigo as string) : undefined;
    const descricao = req.query.descricao ? '%' + req.query.descricao + '%' as string : undefined;

    if (codigo) {
        try {
            const produto = await produtoService.getProdutoByCodigo(codigo);
            res.status(200).json(produto);
        } catch (error) {
            res.status(404).json({ message: 'Produto não encontrado.' });
        }
    } else if (descricao) {
        try {
            const produtos = await produtoService.getProdutosByDescricao(descricao);
            res.status(200).json(produtos);
        } catch (error) {
            res.status(404).json({ message: 'Produto não encontrado.' });
        }
    } else {
        try {
            const produtos = await produtoService.getProdutos();
            res.status(200).json(produtos);
        } catch (error) {
            res.status(404).json({ message: 'Produtos não encontrados.' });
        }
    }
});

router.get('/sincronizar', async (req, res) => {
    try {
        const produtosCriados = await produtoService.sincronizarProdutos();
        res.status(200).json({ message: `${produtosCriados} produtos criados.` });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao sincronizar produtos.' });
    }
});

router.get('/categorias', async (req, res) => {
    try {
        const categorias = await produtoService.getCategoriasprodutos();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(404).json({ message: 'Categorias não encontradas.' });
    }
});

router.get('/categoria/:categoria', async (req, res) => {
    try {
        const produtos = await produtoService.getProdutosByCategoria(req.params.categoria);
        res.status(200).json(produtos);
    } catch (error) {
        res.status(404).json({ message: 'Produtos não encontrados.' });
    }
});

export const produtoRoutes = router;