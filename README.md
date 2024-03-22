# sistema-hera-back

## Descrição

Projeto de back-end do sistema Hera, desenvolvido em Node.js.

## Pré-requisitos

- Node.js
- npm

## Instalação

1. Clone o repositório

    ```bash
    git clone https://github.com/Crown32/sistema-hera-back.git
    ```

2. Instale as dependências

    ```bash
    npm install
    ```

3. Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente necessárias

    ```env
    NODE_ENV = 'dev' # dev | prod
    PORT = 8087 # Porta que o servidor irá rodar
    JWT_SECRET = '' # Chave secreta para geração do token JWT
    TWILIO_ACCOUNT_SID = '' # Credenciais do Twilio
    TWILIO_AUTH_TOKEN = '' # Credenciais do Twilio
    TWILIO_PHONE_NUMBER = '' # Número do Twilio
    MYSQL_HOST = '' # Host do banco de dados
    MYSQL_USER = '' # Usuário do banco de dados
    MYSQL_PASSWORD = '' # Senha do banco de dados
    MYSQL_DATABASE = '' # Nome do banco de dados
    ```

4. Execute o projeto

    ```bash
    npm run dev
    ```

## Tecnologias

- Node.js
- Express
- MySQL
- JWT
- Bcrypt
- Dotenv
- Nodemon
- Cors
- Body-parser

## Swagger

A documentação da API pode ser acessada através do link:

- <http://localhost:8087/api-docs>
