# 📋 Desafio Técnico - G4Flex

Este repositório contém a implementação do desafio técnico da empresa **G4Flex**. O desafio consiste em criar uma **API REST** completa para o cadastro e gerenciamento de tarefas, incluindo um **frontend** para interagir com a aplicação.

---

## 🚀 Funcionalidades

- 📌 **Criar Tarefa**: Permite a criação de novas tarefas.
- 📌 **Listar Tarefas**: Exibe uma lista de todas as tarefas cadastradas.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Linguagem**: TypeScript
- **Framework**: Node.js
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL
- **Servidor HTTP**: Express
- **Docker**: Gerenciamento de banco de dados com container

### Frontend
- **Linguagem**: TypeScript
- **Framework**: React
- **Gerenciador de Pacotes**: npm

---

## ⚙️ Instalação e Uso

### 1️⃣ Clone o Repositório
Clone o projeto em sua máquina local:
```bash
git clone https://github.com/codeYann/tech-assessment.git
```

### 2️⃣ Configurando o Backend

#### Passo 1: Configurar o Banco de Dados (Docker)
Acesse a pasta `backend` e execute:
```bash
cd backend
docker compose up --build -d
```

#### Passo 2: Instalar Dependências
Ainda dentro da pasta `backend`, instale as dependências:
```bash
npm install
```

#### Passo 3: Rodar Migration inicial do Prisma

```bash
npx prisma migrate dev
```

#### Passo 4: Iniciar o Servidor Backend
Execute o servidor em modo de desenvolvimento:
```bash
npm run start:dev
```

### 3️⃣ Configurando o Frontend

#### Passo 1: Instalar Dependências
Acesse a pasta `frontend` e instale as dependências:
```bash
cd frontend
npm install
```

#### Passo 2: Iniciar o Servidor Frontend
Inicie o servidor frontend:
```bash
npm run dev
```

### 4️⃣ Acessar a Aplicação
- O **Backend** estará disponível em: [http://localhost:3000](http://localhost:8080)
- O **Frontend** estará disponível em: [http://localhost:5173](http://localhost:5173)