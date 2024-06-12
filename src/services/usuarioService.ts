import {IUsuario, Usuario} from '../models/Usuario';

export class UsuarioService {
    constructor() {}

    public async getUsuarios() {
        return Usuario.scan().exec();
    }

    public async getUsuarioById(id: string) {
        return Usuario.get(id);
    }

    public async createUsuario(usuario: IUsuario) {
        return Usuario.create(usuario);
    }

    public async updateUsuario(usuario: IUsuario) {
        return Usuario.update(usuario);
    }

    public async deleteUsuario(id: string) {
        return Usuario.delete(id);
    }

}