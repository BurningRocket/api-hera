import {ISecoesSite, SecoesSite} from '../models/SecoesSite';

export class SecoesSiteService {
    constructor() {}

    public async getSecoesSites() {
        return SecoesSite.scan().exec();
    }

    public async getSecoesSiteById(id: string) {
        return SecoesSite.get(id);
    }

    public async getSecoesSiteByTitulo(titulo: string) {
        return SecoesSite.scan('titulo').eq(titulo).exec();
    }

    public async createSecoesSite(secoesSite: ISecoesSite) {
        return SecoesSite.create(secoesSite);
    }

    public async updateSecoesSite(secoesSite: ISecoesSite) {
        return SecoesSite.update(secoesSite);
    }

    public async deleteSecoesSite(id: string) {
        return SecoesSite.delete(id);
    }

}