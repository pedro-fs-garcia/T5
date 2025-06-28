# Atividade Prática V - Desenvolvimento de Um Sistema Completo de Pet Shop

## Professor
Dr. Eng. Gerson Penha

## Tecnologias Utilizadas
- **Frontend**: React 19, TypeScript, Vite, Bootstrap 5.3.0, React Router DOM
- **Backend**: Node.js, Express, TypeScript, MySQL2
- **Banco de Dados**: MySQL
- **IDE**: VSCode

## Contexto

A atividade consiste na criação de uma aplicação completa para o sistema da empresa fictícia **C4P**, que atua no mercado pet.

O projeto visa aplicar conceitos de **UI Design**, focando em criar uma experiência agradável e intuitiva para o usuário, com atenção à navegabilidade, usabilidade e estética visual.

## Objetivo

Desenvolver o frontend e o backend de um sistema completo de Pet Shop com funcionalidades de gerenciamento de clientes, pets, produtos e serviços.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- MySQL (versão 8.0 ou superior)
- npm ou yarn

## Configuração e Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd T5
```

### 2. Configuração do Banco de Dados

1. **Instale e configure o MySQL**
2. **Crie um banco de dados**
   ```sql
   CREATE DATABASE pet_shop;
   ```

### 3. Configuração do Backend

1. **Navegue para a pasta do backend**
   ```bash
   cd backend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na pasta `backend/` com o seguinte conteúdo:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha_mysql
   DB_NAME=c4p
   PORT=3000
   ```

4. **Execute o setup do banco de dados**
   ```bash
   npm run dev
   ```
   O sistema irá criar automaticamente as tabelas necessárias.

### 4. Configuração do Frontend

1. **Navegue para a pasta do frontend**
   ```bash
   cd frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

## Como Executar

### Executando Frontend e Backend Juntos

A partir da raiz do projeto (`T5`), você pode iniciar o frontend e o backend simultaneamente:

```bash
npm install
npm start
```

- O backend será iniciado em `http://localhost:3001`
- O frontend será iniciado em `http://localhost:3000`

> Certifique-se de que as dependências estejam instaladas nas pastas `backend/` e `frontend/` antes de rodar o comando acima.

### Backend

1. **Em desenvolvimento (com hot reload)**
   ```bash
   cd backend
   npm run dev
   ```
   O servidor estará disponível em: `http://localhost:3001`

2. **Em produção**
   ```bash
   cd backend
   npm start
   ```

### Frontend

1. **Em desenvolvimento**
   ```bash
   cd frontend
   npm run dev
   ```
   A aplicação estará disponível em: `http://localhost:3000`

2. **Build para produção**
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

## Como Executar o Projeto (Tudo em um único comando)
1. **Inicie o backend e o frontend juntos:**
   
   ```bash
   npm start
   ```
   - O backend será iniciado em: `http://localhost:3001`
   - O frontend será iniciado em: `http://localhost:3000`

---

## Fluxo Completo (Passo a Passo)

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd T5
   ```
2. **Instale todas as dependências:**
   ```bash
   npm install
   ```
3. **Configure o banco de dados MySQL** (veja instruções na seção de configuração do banco de dados).
4. **Configure as variáveis de ambiente do backend** (arquivo `.env` em `backend/`).
5. **Execute o setup do banco de dados:**
   ```bash
   cd backend
   npm run dev
   ```
   > O sistema irá criar automaticamente as tabelas necessárias.
6. **Volte para a raiz do projeto e rode tudo junto:**
   ```bash
   cd ..
   npm start
   ```

---

## Funcionalidades Implementadas

### 1. CRUD de Clientes
- ✅ Criar, listar, atualizar e excluir clientes
- ✅ Gerenciamento de documentos (CPF, RG)
- ✅ Gerenciamento de telefones
- ✅ Gerenciamento de endereços

### 2. CRUD de Pets
- ✅ Criar, listar, atualizar e excluir pets
- ✅ Associação de pets aos clientes
- ✅ Informações: nome, raça, gênero, tipo

### 3. CRUD de Produtos e Serviços
- ✅ Criar, listar, atualizar e excluir produtos
- ✅ Criar, listar, atualizar e excluir serviços
- ✅ Categorização e preços

### 4. Registro de Consumo
- ✅ Registro de produtos/serviços adquiridos por clientes
- ✅ Histórico de compras

### 5. Relatórios e Estatísticas
- ✅ Top 10 clientes que mais consumiram (quantidade)
- ✅ Listagem geral dos produtos/serviços mais consumidos
- ✅ Produtos/serviços mais consumidos por tipo e raça de pets
- ✅ Top 5 clientes que mais consumiram (valor)

## Estrutura do Projeto

```
T5/
├── frontend/          # Aplicação React + TypeScript
├── backend/           # API Express + TypeScript
├── API_DOCUMENTATION.md
└── README.md
```

## Endpoints da API

A API está disponível em `http://localhost:3001/api` e inclui os seguintes endpoints:

### Clientes
- `GET /api/clientes` - Listar todos os clientes
- `GET /api/clientes/:id` - Buscar cliente por ID
- `POST /api/clientes` - Criar novo cliente
- `PUT /api/clientes/:id` - Atualizar cliente
- `DELETE /api/clientes/:id` - Excluir cliente

### Pets
- `GET /api/pets` - Listar todos os pets
- `GET /api/pets/:id` - Buscar pet por ID
- `POST /api/pets` - Criar novo pet
- `PUT /api/pets/:id` - Atualizar pet
- `DELETE /api/pets/:id` - Excluir pet

### Produtos
- `GET /api/produtos` - Listar todos os produtos
- `POST /api/produtos` - Criar novo produto
- `PUT /api/produtos/:id` - Atualizar produto
- `DELETE /api/produtos/:id` - Excluir produto

### Serviços
- `GET /api/servicos` - Listar todos os serviços
- `POST /api/servicos` - Criar novo serviço
- `PUT /api/servicos/:id` - Atualizar serviço
- `DELETE /api/servicos/:id` - Excluir serviço

### Consumos
- `GET /api/consumos` - Listar todos os consumos
- `POST /api/consumos` - Registrar novo consumo

### Relatórios
- `GET /api/relatorios/top-clientes-quantidade` - Top 10 clientes por quantidade
- `GET /api/relatorios/top-clientes-valor` - Top 5 clientes por valor
- `GET /api/relatorios/produtos-mais-consumidos` - Produtos mais consumidos
- `GET /api/relatorios/consumo-por-tipo-raca` - Consumo por tipo e raça

## Documentação Completa

Para informações detalhadas sobre a API, consulte o arquivo `API_DOCUMENTATION.md`.

## Scripts Disponíveis

### Backend
- `npm run dev` - Executa em modo desenvolvimento com hot reload
- `npm start` - Executa em modo produção
- `npm test` - Executa testes (não implementado)

### Frontend
- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa linter

## Estrutura do Banco de Dados

O sistema utiliza as seguintes tabelas principais:
- `clientes` - Informações dos clientes
- `pets` - Informações dos pets
- `produtos` - Catálogo de produtos
- `servicos` - Catálogo de serviços
- `consumos` - Registro de compras/consumos
- `documentos` - Documentos dos clientes
- `telefones` - Telefones dos clientes
- `enderecos` - Endereços dos clientes

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto foi desenvolvido para fins educacionais como parte da disciplina de Programação Orientada a Objetos.

## Suporte

Para dúvidas ou problemas, entre em contato com o professor responsável ou abra uma issue no repositório.
