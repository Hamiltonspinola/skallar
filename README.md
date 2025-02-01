# Sistema de Gerenciamento de Produtos

Esta é uma aplicação completa para gerenciamento de produtos, composta por duas partes principais:

- **Backend (Product API):**  
  Uma API desenvolvida em Laravel 10 que gerencia a lógica de negócio, acesso aos dados, autenticação e operações CRUD (criação, leitura, atualização e deleção) dos produtos.  
  [Confira a documentação detalhada do Backend »](./backend/README.md)

- **Frontend (Skallar):**  
  Uma aplicação web construída com React e TypeScript que fornece uma interface de usuário intuitiva para interagir com a API.  
  [Confira a documentação detalhada do Frontend »](./frontend/README.md)

---

## Visão Geral do Sistema

O sistema foi projetado seguindo princípios de **Clean Code** e padrões **SOLID** para garantir:
- **Manutenibilidade:** Cada parte da aplicação (backend e frontend) está organizada de forma modular, facilitando a manutenção e a evolução do código.
- **Escalabilidade:** A arquitetura permite que novas funcionalidades sejam adicionadas sem a necessidade de reescrever grandes partes do sistema.
- **Performance:** O backend utiliza técnicas de cache (como o Redis) para otimizar a performance, enquanto o frontend foi construído para oferecer uma experiência responsiva e dinâmica.
- **Flexibilidade:** A separação clara entre backend e frontend possibilita atualizações e melhorias independentes em cada camada.

---

## Como Utilizar Este Repositório

Este repositório contém a documentação completa para ambos os componentes da aplicação:

- **Para saber como configurar, instalar e utilizar a API (backend):**  
  Acesse o arquivo [backend/README.md](./backend/README.md).

- **Para aprender como utilizar a interface de usuário e explorar as funcionalidades do Skallar (frontend):**  
  Acesse o arquivo [frontend/README.md](./frontend/README.md).

Cada uma dessas documentações oferece guias passo a passo, detalhes dos paradigmas e padrões aplicados, e instruções claras para usuários não técnicos, bem como para desenvolvedores.

---

## Conclusão

Este sistema foi desenvolvido para fornecer uma solução robusta e escalável para o gerenciamento de produtos, unindo uma API poderosa e um frontend moderno. Se você deseja contribuir ou tem alguma dúvida, consulte as respectivas documentações ou entre em contato através dos canais informados em cada seção.

Clique nos links para explorar cada parte do sistema:

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
