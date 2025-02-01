<p align="center"><img src="./../frontend/public/images/bg_skallar.jpg" width="400" alt="Skallar Logo"></p>


# Skallar

Skallar é uma aplicação web para gerenciamento de produtos.
Esta aplicação permite que você liste, crie, edite e exclua produtos de forma simples e intuitiva. Este documento descreve os paradigmas, padrões e conceitos aplicados no projeto, os benefícios dessas escolhas, sugestões de melhorias futuras e um manual de uso detalhado para quem não possui conhecimentos técnicos.

---

## Índice

- [Visão Geral](#visão-geral)
- [Arquitetura e Conceitos](#arquitetura-e-conceitos)
  - [Paradigmas e Padrões Aplicados](#paradigmas-e-padrões-aplicados)
  - [Benefícios das Escolhas Arquiteturais](#benefícios-das-escolhas-arquiteturais)
- [Melhorias Potenciais](#melhorias-potenciais)
- [Manual de Uso](#manual-de-uso)
  - [Requisitos do Sistema](#requisitos-do-sistema)
  - [Instalação e Execução](#instalação-e-execução)
  - [Como Usar o Aplicativo](#como-usar-o-aplicativo)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

---

## Visão Geral

O Skallar é uma aplicação voltada para o gerenciamento de produtos. As principais funcionalidades incluem:

- **Listagem de Produtos:** Visualize todos os produtos cadastrados.
- **Criação de Produtos:** Cadastre novos produtos informando nome, preço, quantidade e descrição.
- **Edição de Produtos:** Atualize os dados dos produtos já cadastrados.
- **Exclusão de Produtos:** Remova produtos indesejados da lista.
- **Paginação:** Navegue facilmente entre páginas caso haja muitos produtos.

A aplicação foi construída utilizando:

- **React com TypeScript:** Para garantir interfaces dinâmicas e tipadas, aumentando a segurança e previsibilidade do código.
- **Axios:** Para realizar chamadas à API de forma simples e centralizada.
- **React Router:** Para gerenciar a navegação entre diferentes páginas.
- **Hooks Personalizados:** Para isolar a lógica de estado e efeitos, tornando os componentes mais limpos e reutilizáveis.
- **Context API:** (Parcialmente) para gerenciamento global de estado.
- **Tailwind CSS:** Para estilização rápida, responsiva e consistente.

---

## Arquitetura e Conceitos

### Paradigmas e Padrões Aplicados

#### Componentização e Modularização
- **O que é:** Dividir a aplicação em partes menores (componentes) que podem ser reutilizadas e mantidas de forma independente.  
- **Benefício:** Facilita a manutenção, escalabilidade e o reuso de código.

#### Hooks Personalizados
- **O que é:** Funções que encapsulam lógica reutilizável (como `useProductForm` e `useProducts`).  
- **Benefício:** Mantêm os componentes mais limpos e focados apenas na apresentação, facilitando testes e manutenção.

#### Separação de Responsabilidades
- **O que é:** Distribuir funções específicas para diferentes módulos, como serviços de API, validação de dados e lógica de interface.  
- **Benefício:** Código mais organizado, com responsabilidades bem definidas, facilitando a identificação e correção de problemas.

#### Programação Funcional
- **O que é:** Uso de funções puras e imutabilidade ao lidar com estados e dados.  
- **Benefício:** Código previsível e fácil de testar, com menos efeitos colaterais.

#### Gerenciamento de Estado (Context API e Hooks)
- **O que é:** Uso de `useReducer` e Context para compartilhar e gerenciar dados entre diferentes componentes.  
- **Benefício:** Consistência no estado da aplicação e facilidade na propagação de mudanças entre componentes.

### Benefícios das Escolhas Arquiteturais

- **Manutenibilidade:** A divisão clara em módulos (componentes, hooks, serviços) facilita a identificação e a correção de erros.
- **Escalabilidade:** A arquitetura modular permite adicionar novas funcionalidades sem grandes mudanças no código existente.
- **Reutilização:** Componentes e hooks podem ser facilmente reaproveitados em outras partes da aplicação ou em projetos futuros.
- **Testabilidade:** Funções puras e a separação de responsabilidades tornam o código mais fácil de testar e de manter.
- **Performance:** Atualizações de estado otimizadas e renderizações condicionais garantem que a aplicação seja responsiva e eficiente.

---

## Melhorias Potenciais

Embora a aplicação já utilize boas práticas, há sempre espaço para melhorias:

- **Sistema de Notificações:**  
  Implementar um sistema de notificações (por exemplo, com `react-toastify`) para exibir mensagens de erro e sucesso de forma mais amigável que os tradicionais alertas.

- **Integração Completa do Contexto Global:**  
  Integrar de maneira mais consistente o `ProductProvider` com os componentes que consomem dados para evitar redundâncias no gerenciamento de estado.

- **Variáveis de Ambiente:**  
  Utilizar variáveis de ambiente para definir o `baseURL` da API, facilitando a configuração para diferentes ambientes (desenvolvimento, testes, produção).

- **Validações Mais Robusta:**  
  Considerar o uso de bibliotecas de validação (como `Yup` ou `Joi`) para um controle de validação mais detalhado e padronizado.

- **Containerização com Docker:**  
  Criar um `Dockerfile` para empacotar a aplicação em um container, simplificando o deployment e a escalabilidade em ambientes de produção.

---

## Manual de Uso

Este manual foi preparado para que qualquer pessoa, mesmo sem conhecimentos técnicos, possa utilizar a aplicação de forma simples.

### Requisitos do Sistema

- **Navegador Moderno:**  
  Utilize um navegador atualizado (Google Chrome, Mozilla Firefox, Microsoft Edge, etc.).

- **Conexão à Internet:**  
  Se a aplicação estiver hospedada online, certifique-se de que seu dispositivo esteja conectado à internet.

### Instalação e Execução

#### Para Usuários Finais (Não Desenvolvedores)

1. **Acessar a Aplicação:**
   - Abra seu navegador.
   - Digite na barra de endereços o URL fornecido para a aplicação (por exemplo, `http://localhost:3000` se estiver em um ambiente local ou o endereço da versão hospedada).

2. **Navegação Simples:**
   - Você verá a tela inicial com a lista de produtos.
   - Todos os botões e links possuem legendas claras para ajudar na navegação.

#### Para Desenvolvedores (Instalação Local)

Caso você queira executar a aplicação em seu computador, siga os passos abaixo:

1. **Pré-Requisitos:**
   - [Node.js](https://nodejs.org/) instalado.
   - [Git](https://git-scm.com/) instalado.

2. **Passos de Instalação:**
   - **Clonar o Repositório:**
     ```bash
     git clone <URL-do-repositório>
     ```
   - **Entrar na Pasta do Projeto:**
     ```bash
     cd nome-do-projeto
     ```
   - **Instalar Dependências:**
     ```bash
     npm install
     ```
   - **Iniciar a Aplicação:**
     ```bash
     npm run dev
     ```
   - **Acessar no Navegador:**  
     Abra seu navegador e acesse: `http://localhost:3000`

### Como Usar o Aplicativo

1. **Página Inicial – Lista de Produtos:**
   - **O que você vê:**  
     Uma lista com todos os produtos cadastrados.
   - **Caso não haja produtos:**  
     A lista estará vazia, indicando que nenhum produto foi cadastrado ainda.

2. **Criar um Novo Produto:**
   - **Clique no botão "Novo Produto":**  
     Você será redirecionado para uma tela com um formulário.
   - **Preencha o Formulário:**
     - **Nome:** Informe o nome do produto.
     - **Preço:** Informe o preço. Utilize ponto (.) para separar os decimais.
     - **Quantidade:** Informe a quantidade disponível.
     - **Descrição:** Adicione uma descrição para o produto.
   - **Clique em "Salvar":**  
     Se todos os dados estiverem corretos, o produto será cadastrado e você retornará à lista.

3. **Editar um Produto:**
   - **Localize o Produto na Lista:**  
     Ao lado de cada produto, há um botão "Editar".
   - **Clique em "Editar":**  
     Você será direcionado para uma tela com o formulário preenchido com os dados do produto.
   - **Atualize os Dados Necessários e Clique em "Salvar":**  
     As alterações serão salvas e você retornará à lista.

4. **Excluir um Produto:**
   - **Localize o Produto na Lista:**  
     Cada produto possui um botão "Excluir".
   - **Clique em "Excluir":**  
     O produto será removido da lista após a ação.

5. **Navegação pela Paginação:**
   - Caso haja muitos produtos, a lista será dividida em páginas.
   - Utilize os botões "Anterior" e "Próxima" para navegar entre as páginas.

---

## Contribuição

Contribuições são bem-vindas! Se você deseja sugerir melhorias ou corrigir algum problema, por favor, abra uma _issue_ ou envie um _pull request_ seguindo as boas práticas do projeto.

---
