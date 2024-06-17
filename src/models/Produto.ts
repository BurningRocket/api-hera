import { Schema, model } from 'dynamoose';
import { Item } from "dynamoose/dist/Item";
import { v4 as uuidv4 } from 'uuid';

export interface IProduto extends Item{
    id: string;
    descricao: string;
    descricaoSite: string;
    unidade: string;
    peso: string;
    valorCapital: number;
    valorCapitalPromocao: number;
    valorInterior: number;
    valorInteriorPromocao: number;
    categoria: string;
    subCategoria: string;
    imagens: string[];
    tags: string[];
}

const ProdutoSchema = new Schema({
    id: {
        type: String,
        hashKey: true,
        default: uuidv4(),
    },
    descricao: {
        type: String,
    },
    descricaoSite: {
        type: String,
    },
    unidade: {
        type: String,
    },
    peso: {
        type: String,
    },
    valorCapital: {
        type: Number,
    },
    valorCapitalPromocao: {
        type: Number,
    },
    valorInterior: {
        type: Number,
    },
    valorInteriorPromocao: {
        type: Number,
    },
    categoria: {
        type: String,
    },
    subCategoria: {
        type: String,
    },
    imagens: {
        type: Array,
    },
    tags: {
        type: Array,
    },
}, {
    timestamps: true,
});

export const Produto = model<IProduto>('Produto', ProdutoSchema);