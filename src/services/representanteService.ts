import mysql, {Pool, PoolOptions, RowDataPacket} from 'mysql2';
import {IRepresentante, Representante} from '../models/Representante';

export class RepresentanteService {
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

    public async getRepresentantes() {
        return Representante.scan().exec();
    }

    public async getRepresentanteSql() {
        const sql = 'SELECT * FROM vtech_vendedores';
        const representantes = await this.connection.promise().query(sql);
        return representantes[0] as RowDataPacket;
    }

    public async getRepresentanteByCodigo(codigo: number) {
        return Representante.get(codigo.toString());
    }

    public async getRepresentantesByDescricao(descricao: string) {
        return Representante.scan('descricao').contains(descricao).exec();
    }

    public async sincronizarRepresentantes() {
        const representantes: RowDataPacket = await this.getRepresentanteSql();
        let representantesCriados = 0;

        for (let i = 0; i < representantes.length; i++) {
            const representante = representantes[i];

            const representanteModel = new Representante({
                id: representante.id.toString(),
                documento: representante.documento,
                nome: representante.nome,
                cidade: representante.cidade,
            }) as IRepresentante;

            const representanteCriado = setTimeout(async () => {
                await Representante.create(representanteModel);
                console.log('Representante criado: ' + representanteModel.nome);
                clearTimeout(representanteCriado);
                return representanteModel;
            }, 300);

            representantesCriados++;
        }

        return representantesCriados;
    }

    public async createRepresentante(representante: IRepresentante) {
        return Representante.create(representante);
    }

    public async updateRepresentante(representante: IRepresentante) {
        return Representante.update(representante);
    }

    public async deleteRepresentante(id: string) {
        return Representante.delete(id);
    }

}