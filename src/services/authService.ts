import {IUsuario, Usuario} from '../models/Usuario';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
    constructor() { }

    //TODO: Adicionar lógica do S3 para guardar foto de perfil
    async register(registerUsuario: IUsuario) {
        if(!registerUsuario.email || !registerUsuario.senha || !registerUsuario.nome) throw { message: 'Email, senha e nome são obrigatórios' };

        const oldUsuario = await Usuario.scan("email").contains(registerUsuario.email).exec();

        if (oldUsuario.count > 0) throw { message: 'Usuário já existente' };

        registerUsuario.senha = await bcrypt.hash(registerUsuario.senha, 10);

        registerUsuario.tabelaPreco = 'A';

        const usuario = await Usuario.create(registerUsuario);

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
            },
            process.env.JWT_SECRET || 'secret',
            {
                expiresIn: '1d',
            }
        );

        return {
            id: usuario.id,
            nome: usuario.nome,
            isAdmin: usuario.isAdmin,
            email: usuario.email,
            token: token
        };

    }

    async login(loginUsuario: IUsuario) {
        const usuarioScan = await Usuario.scan("email").contains(loginUsuario.email).exec();

        if (usuarioScan.count < 0) throw { message: 'Usuário não existe' };

        if (usuarioScan.count > 1) throw { message: 'Usuário duplicado' };

        const usuario = usuarioScan[0];

        const validPassword = await bcrypt.compare(loginUsuario.senha, usuario.senha);

        if (!validPassword) throw { message: 'Senha invalida' };

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
            },
            process.env.JWT_SECRET || 'secret',
            {
                expiresIn: '1d',
            }
        );

        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            isAdmin: usuario.isAdmin,
            tabelaPreco: usuario.tabelaPreco,
            token: token
        };
    }

    async logout() {
        //TODO
    }

    async forgotPassword() {
        //TODO
    }

    async resetPassword() {
        //TODO
    }
}