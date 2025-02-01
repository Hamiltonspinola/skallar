# Product API

Esta é uma API desenvolvida em **Laravel 10** para gerenciar produtos, implementando funcionalidades de criação, consulta, atualização e deleção. A aplicação foi construída com foco na manutenibilidade, escalabilidade e performance, utilizando princípios de **Clean Code** e os padrões **SOLID**.

## Sumário

- [Introdução](#introdução)
- [Paradigmas, Padrões e Conceitos Aplicados](#paradigmas-padrões-e-conceitos-aplicados)
- [Benefícios da Arquitetura Utilizada](#benefícios-da-arquitetura-utilizada)
- [Requisitos](#requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Execução com Docker](#execução-com-docker)
- [Manual de Uso da API](#manual-de-uso-da-api)
  - [Endpoints Disponíveis](#endpoints-disponíveis)
  - [Como Utilizar a API (Passo a Passo)](#como-utilizar-a-api-passo-a-passo)
- [Considerações Finais](#considerações-finais)

## Introdução

Esta API permite gerenciar um catálogo de produtos, possibilitando operações como listagem, consulta por ID, criação, atualização e exclusão de produtos. A aplicação foi estruturada para separar as responsabilidades em diferentes camadas, o que facilita a manutenção e a evolução do sistema.

## Paradigmas, Padrões e Conceitos Aplicados

- **SOLID**:  
  - **SRP (Single Responsibility Principle):** Cada classe (Controller, Service, Repository) tem uma única responsabilidade.  
  - **DIP (Dependency Inversion Principle):** O _service_ depende de abstrações (interfaces) e não de implementações concretas, permitindo a troca de componentes (por exemplo, o uso do cache com Redis).

- **Repository Pattern:**  
  Separa a lógica de acesso aos dados em uma camada dedicada (Repository). Isso desacopla o acesso ao banco de dados e permite que a aplicação seja facilmente adaptada a mudanças ou migrações para outros sistemas de armazenamento.

- **Service Pattern:**  
  Centraliza a lógica de negócio em uma camada de serviço, que orquestra as operações de forma independente da forma como os dados são armazenados ou apresentados.

- **Decorator Pattern para Cache:**  
  Implementa uma camada de cache (utilizando Redis) para otimizar a recuperação dos dados sem alterar a implementação original do repositório. Essa camada intercepta chamadas de leitura e armazena os resultados no cache, melhorando a performance da aplicação.

- **Clean Code:**  
  O código foi escrito de forma clara e modular, com uma separação de responsabilidades que facilita a leitura, testes e manutenção.

## Benefícios da Arquitetura Utilizada

- **Manutenção e Evolução:**  
  Ao separar as responsabilidades, cada camada pode ser modificada ou estendida sem impactar as demais.
  
- **Testabilidade:**  
  Com a injeção de dependências e o uso de interfaces, torna-se mais fácil criar testes unitários para cada parte do sistema.
  
- **Escalabilidade:**  
  O uso do cache com Redis melhora a performance, principalmente em ambientes com alto volume de acessos.
  
- **Flexibilidade:**  
  A aplicação pode evoluir para incluir novos recursos ou trocar componentes (como o driver de cache) sem reescrever a lógica de negócio.

## Requisitos

- **PHP 8.0+**
- **Composer**
- **Banco de Dados** (por exemplo, MySQL ou PostgreSQL)
- **Redis**
- (Opcional) **Docker** e **Docker Compose** para facilitar a configuração dos ambientes

## Instalação e configuração

**Clone o repositório:**

    ```bash
    git clone https://github.com/Hamiltonspinola/skallar.git
    
    cd product-api
    
    composer install

    cp .env.example .env

**Execução local**

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=nome_do_banco
    DB_USERNAME=seu_usuario
    DB_PASSWORD=sua_senha

    CACHE_DRIVER=redis
    REDIS_HOST=127.0.0.1
    REDIS_PASSWORD=null
    REDIS_PORT=6379

    php artisan key:generate

    php artisan migrate

    php artisan serve

**Execução com Docker**

    docker-compose up -d

    docker-compose logs -f


# Manual de Uso da API

Mesmo que você não tenha conhecimentos técnicos em programação, este guia explica de forma simples como utilizar a API.

---

## Endpoints Disponíveis

### Listar Produtos (Paginação)
- **Método:** `GET`
- **URL:** `/api/product`
- **Descrição:** Lista todos os produtos cadastrados. Aceita o parâmetro opcional `per_page` para definir quantos produtos serão exibidos por página.

### Consultar Produto por ID
- **Método:** `GET`
- **URL:** `/api/product/{id}`
- **Descrição:** Retorna os detalhes de um produto específico. Substitua `{id}` pelo número identificador do produto.

### Criar Produto
- **Método:** `POST`
- **URL:** `/api/product`
- **Descrição:** Cria um novo produto.
- **Dados Necessários (JSON):**
  - `name` (Nome do produto)
  - `description` (Descrição do produto)
  - `price` (Preço do produto, por exemplo, 49.99)
  - `quantity` (Quantidade em estoque)

### Atualizar Produto
- **Método:** `PUT`
- **URL:** `/api/product/{id}`
- **Descrição:** Atualiza os dados de um produto existente. Substitua `{id}` pelo identificador do produto.
- **Dados Necessários:** Envie os campos que deseja atualizar.

### Excluir Produto
- **Método:** `DELETE`
- **URL:** `/api/product/{id}`
- **Descrição:** Remove o produto especificado do sistema.

---

## Como Utilizar a API (Passo a Passo)

### Ferramentas de Consumo da API

- **Postman** ou **Insomnia**  
  São aplicativos que permitem enviar requisições HTTP e visualizar as respostas em formato JSON. São intuitivos e não exigem conhecimentos avançados.

### Exemplo de Uso com o Postman

#### Para Listar Produtos:
1. Abra o Postman e crie uma nova requisição.
2. Selecione o método **GET**.
3. Digite a URL:  
   `http://127.0.0.1:8000/api/product?per_page=10`
4. Clique em **Send** (Enviar) e veja a lista de produtos.

#### Para Consultar um Produto:
1. Crie uma nova requisição **GET**.
2. Utilize a URL:  
   `http://127.0.0.1:8000/api/product/1`  
   *(substitua `1` pelo ID do produto desejado)*
3. Clique em **Send** para ver os detalhes do produto.

#### Para Criar um Produto:
1. Crie uma requisição **POST**.
2. Utilize a URL:  
   `http://127.0.0.1:8000/api/product`
3. No corpo da requisição, selecione o formato **raw** e escolha **JSON**.
4. Insira um JSON como o exemplo abaixo:
   ```json
   {
     "name": "Camiseta Exemplo",
     "description": "Camiseta de algodão, cor azul",
     "price": "39.99",
     "quantity": 100
   }

#### Para Atualizar (Editar) um Produto

1. Crie uma requisição **PUT**.
2. Utilize a URL:  
   `http://127.0.0.1:8000/api/product/1`  
   *(Substitua `1` pelo ID do produto que deseja editar.)*
3. No corpo da requisição, envie os campos que deseja atualizar (em formato JSON). Por exemplo:
   ```json
   {
     "price": "29.99",
     "quantity": 150
   }
