import {IOrcamento, Orcamento} from '../models/Orcamento';
import mysql, {Pool, PoolOptions, RowDataPacket} from 'mysql2';

export class OrcamentoService {
    private connection: Pool;
    private connectionOptions: PoolOptions = {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
    };

    constructor() {
        this.connection = mysql.createPool(this.connectionOptions);
    }

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

    // public async salvarOrcamentoSql(orcamento: IOrcamento) {
    //     const sql = 'INSERT INTO vtech_orcamentos (id, nome, email, telefone, mensagem) VALUES (?, ?, ?, ?, ?)';
    //     const values = [orcamento.id, orcamento.nome, orcamento.email, orcamento.telefone, orcamento.mensagem];
    //     return this.connection.promise().query(sql, values);
    // }
}