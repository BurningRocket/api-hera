import { Schema, model } from 'dynamoose';
import { Item } from "dynamoose/dist/Item";
import { v4 as uuidv4 } from 'uuid';

export interface ISecoesSite extends Item{
    id: string;
    titulo: string;
    subtitulo: string;
    descricao: string;
    botao: string;
    imagem: string;
    tag: string;
    categoria: string;
}

const SecoesSiteSchema = new Schema({
    id: {
        type: String,
        hashKey: true,
        default: uuidv4(),
    },
    titulo: {
        type: String,
    },
    subtitulo: {
        type: String,
    },
    descricao: {
        type: String,
    },
    botao: {
        type: String,
    },
    imagem: {
        type: String,
    },
    tag: {
        type: String,
    },
    categoria: {
        type: String,
    },
}, {
    timestamps: true,
});

export const SecoesSite = model<ISecoesSite>('SecoesSite', SecoesSiteSchema);