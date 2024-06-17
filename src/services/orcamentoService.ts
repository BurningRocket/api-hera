import {IOrcamento, Orcamento} from '../models/Orcamento';

export class OrcamentoService {
    constructor() {}

    public async getOrcamentos() {
        return Orcamento.scan().exec();
    }

    public async getOrcamentoById(id: string) {
        return Orcamento.get(id);
    }

    public async createOrcamento(ocamento: IOrcamento) {
        return Orcamento.create(ocamento);
    }

    public async updateOrcamento(ocamento: IOrcamento) {
        return Orcamento.update(ocamento);
    }

    public async deleteOrcamento(id: string) {
        return Orcamento.delete(id);
    }

}