import { Schema, model } from 'dynamoose';
import { Item } from "dynamoose/dist/Item";
import { v4 as uuidv4 } from 'uuid';

export interface IRepresentante extends Item{
    id: string;
    documento: string;
    nome: string;
    cidade: string;
}

const ProdutoSchema = new Schema({
    id: {
        type: String,
        hashKey: true,
        default: uuidv4(),
    },
    documento: {
        type: String,
    },
    nome: {
        type: String,
    },
    cidade: {
        type: String,
    },
});

export const Representante = model<IRepresentante>('Representante', ProdutoSchema);