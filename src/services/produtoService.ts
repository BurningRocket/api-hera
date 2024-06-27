import mysql, {Pool, PoolOptions, RowDataPacket} from 'mysql2';
import {IProduto, Produto} from '../models/Produto';
import AWS from 'aws-sdk';
import multer from 'multer';


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
    return Produto.scan().exec();
  }

  public async getProdutoSql() {
    const sql = 'SELECT * FROM vtech_produtos';
    const produtos = await this.connection.promise().query(sql);
    return produtos[0] as RowDataPacket;
  }

  public async getProdutosByCategoria(categoria: string) {
    console.log(categoria)
    return Produto.scan('categoria').eq(categoria).exec();
  }

  public async getCategoriasprodutos() {
    const sql = 'SELECT categoria FROM vtech_produtos group by categoria';
    const categorias = await this.connection.promise().query(sql);
    return categorias[0] as RowDataPacket;
  }

  public async getProdutoByCodigo(codigo: number) {
    return Produto.get(codigo.toString());
  }

  public async getProdutosByDescricao(descricao: string) {
    return Produto.scan('descricao').contains(descricao).exec();
  }

  public async sincronizarProdutos() {
    const produtos: RowDataPacket = await this.getProdutoSql();
    let produtosCriados = 0;

    for (let i = 0; i < produtos.length; i++) {
      const produto = produtos[i];

      const produtoModel = new Produto({
        id: produto.codigo.toString(),
        descricao: produto.descricao,
        descricaoSite: produto.descricao_site,
        unidade: produto.unidade,
        peso: produto.peso,
        valorCapital: Number(produto.capital.replace(',', '.')),
        valorCapitalPromocao: Number(produto.prom_capital.replace(',', '.')),
        valorInterior: Number(produto.interior.replace(',', '.')),
        valorInteriorPromocao: Number(produto.prom_interior.replace(',', '.')),
        categoria: produto.categoria,
      }) as IProduto;

      const produtoCriado = setTimeout(async () => {
        await Produto.create(produtoModel);
        console.log('Produto criado: ' + produtoModel.descricao);
        clearTimeout(produtoCriado);
        return produtoModel;
        }, 300);

      produtosCriados++;
    }

    return produtosCriados;
  }

  public async createProduto(produto: IProduto) {
    return Produto.create(produto);
  }

  public async updateProduto(produto: IProduto) {
    return Produto.update(produto);
  }

  public async uploadImage(id: string, file: Express.Multer.File) {
    // const s3 = new AWS.S3({
    //   accessKeyId: process.env.AWS_LOCAL_ACCESS_KEY_ID,
    //   secretAccessKey: process.env.AWS_LOCAL_SECRET_ACCESS_KEY,
    // });
    //
    // const uploadParams = {
    //   Bucket: process.env.AWS_LOCAL_BUCKET_NAME,
    //   Key: id,
    //   Body: file.buffer,
    //   ContentType: file.mimetype,
    //   ACL: 'public-read',
    // };
    //
    // return s3.upload(uploadParams).promise();
  }

  public async deleteProduto(id: string) {
    return Produto.delete(id);
  }

}