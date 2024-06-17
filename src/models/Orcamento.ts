import { Schema, model } from 'dynamoose';
import { Item } from "dynamoose/dist/Item";
import { v4 as uuidv4 } from 'uuid';

export interface IOrcamento extends Item{
    id: string;
    descricao: string;
    idProdutos: string[];
    idCliente: string;
    idVendedor: string;
    valorTotal: number;
    status: string;
    observacao: string;
}

const OrcamentoSchema = new Schema({
    id: {
        type: String,
        hashKey: true,
        default: uuidv4(),
    },
    descricao: {
        type: String,
    },
    idProdutos: {
        type: Array,
    },
    idCliente: {
        type: String,
    },
    idVendedor: {
        type: String,
    },
    valorTotal: {
        type: Number,
    },
    status: {
        type: String,
    },
    observacao: {
        type: String,
    },
}, {
    timestamps: true,
});

export const Orcamento = model<IOrcamento>('Orcamento', OrcamentoSchema);