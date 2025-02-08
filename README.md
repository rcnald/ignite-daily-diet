# Daily Diet API

Uma API REST desenvolvida em Node.js, Fastify e TypeScript para gerenciamento de dieta, permitindo aos usuários registrarem e acompanharem suas refeições diárias de forma segura e eficiente.

Este projeto foi desenvolvido como parte dos meus estudos em backend, utilizando tecnologias modernas como Node.js, Fastify, TypeScript, Knex para SQL queries, e Zod para validação de dados. A API oferece um sistema completo para controle de dieta, incluindo registro de refeições, métricas de desempenho e histórico alimentar detalhado.

## Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu sistema.

## Como Usar

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/rcnald/ignite-daily-diet.git
   # ou
   gh repo clone rcnald/ignite-daily-diet
   ```

2. **Entre no diretório do projeto:**
   ```bash
   cd ignite-daily-diet
   ```

3. **Instale as dependências do projeto:**
   ```bash
   npm install
   ```

4. **Inicie o projeto:**
   ```bash
   npm run dev
   ```
   - O projeto será iniciado na porta [http://localhost:3333](http://localhost:3333) (se disponível).


## Funcionalidades Principais

- Autenticação e identificação de usuários via cookies

- Gerenciamento completo de refeições
  - Registro com nome, descrição, data/hora e status da dieta usando TypeScript e Zod para validação
  - Listagem de refeições
  - Visualização detalhada de refeições específicas com tratamento de erros

- Sistema de métricas
  - Quantidade de refeições dentro/fora da dieta
  - Melhor sequência de refeições dentro da dieta 

- Segurança
  - Sistema robusto de autenticação com cookies
  - Validação de dados com Zod
  - Usuários só podem acessar suas próprias refeições


### Regras da aplicação

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
    - [x] *As refeições devem ser relacionadas a um usuário.*
    - [x] Nome
    - [x] Descrição
    - [x] Data e Hora
    - [x] Está dentro ou não da dieta
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível recuperar as métricas de um usuário
    - [x] Quantidade total de refeições registradas
    - [x] Quantidade total de refeições dentro da dieta
    - [x] Quantidade total de refeições fora da dieta
    - [x] Melhor sequência de refeições dentro da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou
