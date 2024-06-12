import mysql, { Pool, PoolOptions } from 'mysql2';

export class ProdutoService {
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

  public async getProdutos() {
    const sql = 'SELECT * FROM vtech_produtos';
    const produtos = await this.connection.promise().query(sql);    
    return produtos[0];
  }

  public async getProdutoByCodigo(codigo: number) {
    const sql = 'SELECT * FROM vtech_produtos WHERE codigo = ?';
    const produto = await this.connection.promise().query(sql, [codigo]);
    return produto[0];
  }

  public async getProdutosByDescricao(descricao: string) {
    const sql = 'SELECT * FROM vtech_produtos WHERE descricao like ?';
    const produtos = await this.connection.promise().query(sql, [descricao]);
    return produtos[0];
  }

}