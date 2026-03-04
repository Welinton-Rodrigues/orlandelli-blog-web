# 🎨 Orlandeli — Cartunista e Ilustrador

Site oficial do **Orlandeli**, cartunista e ilustrador brasileiro, criador de *O Mundo de Yang*. Showcasing de quadrinhos, ilustrações, blog e loja.

## 📸 Visão Geral

O projeto é um site-portfólio completo com as seguintes seções:

- **Home** — Página inicial com destaques e apresentação
- **Quadrinhos** — Galeria de quadrinhos com capas e leitura de páginas
- **Portfólio** — Ilustrações organizadas por tags/categorias
- **O Mundo de Yang** — Seção dedicada à série principal
- **Blog** — Artigos e novidades
- **Loja** — Integração com loja externa
- **Sobre** — Biografia e informações sobre o artista

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build | [Vite 5](https://vitejs.dev/) |
| Estilização | [Tailwind CSS 3](https://tailwindcss.com/) |
| Componentes UI | [shadcn/ui](https://ui.shadcn.com/) (Radix UI) |
| Animações | [Framer Motion](https://www.framer.com/motion/) |
| Roteamento | [React Router 6](https://reactrouter.com/) |
| Data Fetching | [TanStack Query](https://tanstack.com/query) |
| CMS (Backend) | [Strapi](https://strapi.io/) |

## 📁 Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis (Header, Footer, Layout, NavLink)
│   └── ui/           # Componentes shadcn/ui
├── hooks/            # Custom hooks (useQuadrinhos, useIlustracoes, etc.)
├── lib/              # Utilitários, tipos e integração com Strapi
├── pages/            # Páginas da aplicação
│   ├── Index.tsx
│   ├── Quadrinhos.tsx
│   ├── Portfolio.tsx
│   ├── Yang.tsx
│   ├── Blog.tsx
│   ├── Loja.tsx
│   └── Sobre.tsx
└── test/             # Testes automatizados
```

## 🚀 Como Rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)
- npm ou bun
- Instância do [Strapi](https://strapi.io/) rodando (para o CMS)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Welinton-Rodrigues/orlandelli-blog-web.git
cd orlandelli-blog-web

# Instale as dependências
npm install

# Configure a URL do Strapi (crie/edite o arquivo .env)
echo VITE_STRAPI_URL=http://localhost:1337 > .env

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:8080`.

### Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Linting com ESLint |
| `npm run test` | Rodar testes |
| `npm run test:watch` | Testes em modo watch |

## ⚙️ Variáveis de Ambiente

| Variável | Descrição | Padrão |
|---|---|---|
| `VITE_STRAPI_URL` | URL da API Strapi | `http://localhost:1337` |

## 📝 Licença

Este projeto é privado e de uso exclusivo do autor.
