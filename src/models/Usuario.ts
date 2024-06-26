import { Schema, model } from 'dynamoose';
import { Item } from "dynamoose/dist/Item";
import { v4 as uuidv4 } from 'uuid';

// A = CAPITAL
// B = INTERIOR
// C = CAPITAL_PROMOCAO
// D = INTERIOR_PROMOCAO

export interface IUsuario extends Item{
    id: string;
    nome: string;
    email: string;
    senha: string;
    isAdmin: boolean;
    cnpj: string;
    cpf: string;
    cep: string;
    razaoSocial: string;
    tabelaPreco: string;
    codRepresentante: string;
    urlFoto:string;
}

const UsuarioSchema = new Schema({
    id: {
        type: String,
        hashKey: true,
        default: uuidv4(),
    },
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cnpj: {
        type: String,
    },
    cpf: {
        type: String,
    },
    cep: {
        type: String,
    },
    razaoSocial: {
        type: String,
    },
    verPreco: {
        type: Boolean,
        default: false
    },
    tabelaPreco: {
        type: String,
    },
    codRepresentante: {
        type: String,
    },
    urlFoto: {
        type: String,
    },
}, {
    timestamps: true,
});

export const Usuario = model<IUsuario>('Usuario', UsuarioSchema);