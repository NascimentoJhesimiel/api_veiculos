# 🚗 DESAFIO: API Simples de Veículos

## 📋 O que você vai fazer

Criar uma API básica para cadastrar veículos com:
- ✅ Login com JWT (como na aula)
- ✅ Cadastrar, listar, editar e deletar veículos
- ✅ Salvar dados em arquivo JSON
- ✅ Proteger rotas com token

## 🎯 O que você vai aprender

- Usar Express.js para criar API
- Autenticação com JWT
- CRUD básico (Create, Read, Update, Delete)
- Trabalhar com arquivos JSON
- Middlewares de validação

## 🏗️ Estrutura Simples

```
src/
├── controllers/
│   ├── auth.controller.js     # Login
│   └── vehicle.controller.js  # CRUD veículos
├── middlewares/
│   └── validateJWT.js         # Validar token (igual da aula)
├── models/
│   ├── users.json            # Dados dos usuários
│   └── vehicles.json         # Dados dos veículos
├── routes/
│   ├── auth.route.js         # Rotas de login
│   ├── vehicle.route.js      # Rotas de veículos
│   └── index.js              # Juntar todas as rotas
├── services/
│   └── jwt.service.js        # JWT (igual da aula)
├── app.js                    # Express
└── server.js                 # Iniciar servidor
```

## 📊 Dados bem simples

### 👤 **Usuário** (users.json)
```json
{
  "nextId": 1,
  "users": [
    {
      "id": 1,
      "name": "João",
      "email": "joao@email.com",
      "password": "123456"
    }
  ]
}
```

### 🚗 **Veículo** (vehicles.json)
```json
{
  "nextId": 1,
  "vehicles": [
    {
      "id": 1,
      "brand": "Toyota",
      "model": "Corolla", 
      "year": 2020,
      "color": "Branco",
      "price": 80000
    }
  ]
}
```

## 🚀 Passo a passo

### **Passo 1: Preparar** 
```bash
mkdir desafio-veiculos
cd desafio-veiculos
npm init -y
npm install express jsonwebtoken dotenv
npm install --save-dev nodemon
```

### **Passo 2: Configurar** 
- Crie as pastas da estrutura
- Crie arquivo `.env`: `PORT=3000` e `JWT_SECRET=minhasenha123`
- Configure `package.json`:
```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon src/server.js"
  }
}
```

### **Passo 4: Fazer login** 
- [ ] `auth.controller.js`: função de login simples
- [ ] `auth.route.js`: rota POST /login
- [ ] Testar login no Postman

### **Passo 5: CRUD veículos** 
- [ ] `vehicle.controller.js`: criar, listar, buscar, editar, deletar
- [ ] `vehicle.route.js`: todas as rotas com JWT
- [ ] Testar tudo no Postman

### **Passo 6: Finalizar** 
- [ ] `routes/index.js`: juntar auth e vehicle
- [ ] Conectar no `app.js`
- [ ] Testar tudo funcionando

## 🔧 Exemplo de como testar

### **1. Fazer login**
```bash
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "123456"
}
```

### **2. Usar o token para criar veículo**
```bash
POST http://localhost:3000/vehicles
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "brand": "Honda",
  "model": "Civic",
  "year": 2022,
  "color": "Preto",
  "price": 90000
}
```

## 💡 Dicas importantes

### **Para o login funcionar:**
1. Crie um usuário fixo no `users.json` para testar
2. Use a mesma lógica do `auth.controller.js` da aula
3. Retorne o token quando login der certo

### **Para os veículos:**
1. Use o middleware `validateJWT` em todas as rotas
2. Leia e escreva no arquivo `vehicles.json` (como na aula com pets)
3. Cada veículo precisa de um ID único

### **Se der erro:**
1. Confira se o token está no header: `Authorization: Bearer TOKEN`
2. Confira se o arquivo JSON está no formato correto
3. Use `console.log()` para debugar

## 📋 **Especificação Completa dos Endpoints**

### 🔐 **Autenticação**
| Método | Endpoint | Descrição | Autenticado |
|--------|----------|-----------|-------------|
| POST | `/auth/login` | Fazer login | ✅ |
| POST | `/auth/logout` | Logout (invalidar token) | ✅ |

### 👤 **Usuários**
| Método | Endpoint | Descrição | Autenticado |
|--------|----------|-----------|-------------|
| GET | `/users` | Listar usuários (admin) | ✅ |
| GET | `/users/:id` | Buscar usuário | ✅ |
| PUT | `/users/:id` | Atualizar usuário | ✅ |
| DELETE | `/users/:id` | Deletar usuário | ✅ |

### 🚗 **Veículos**
| Método | Endpoint | Descrição | Autenticado |
|--------|----------|-----------|-------------|
| GET | `/vehicles` | Listar veículos | ✅ |
| GET | `/vehicles/:id` | Buscar veículo | ✅ |
| POST | `/vehicles` | Criar veículo | ✅ |
| PUT | `/vehicles/:id` | Atualizar veículo | ✅ |
| DELETE | `/vehicles/:id` | Deletar veículo | ✅ |

## 🔒 DESAFIO EXTRA: Criptografia de Senhas com bcrypt

### **Depois que tudo estiver funcionando, implemente:**

**1. Instalar bcrypt** (5 min)
```bash
npm install bcryptjs
```

**2. Criar hash.service.js** (15 min)
```javascript
// src/services/hash.service.js
import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
```

**3. Atualizar auth.controller.js** (15 min)
- Na função de login, use `comparePassword()` em vez de comparar direto
- Ao criar usuário, use `hashPassword()` antes de salvar

**4. Atualizar users.json** (5 min)
- Substitua senhas em texto por hashes bcrypt
- Exemplo: `"password": "$2a$10$xyz..."`

### **Por que fazer isso?**
- **Segurança**: Senhas nunca ficam expostas
- **Padrão da indústria**: Toda aplicação real usa
- **Aprendizado**: Conceito fundamental de segurança

## 🛡️ CURIOSIDADE: Segurança Avançada (Opcional)

### **Para os curiosos que querem aprender mais sobre segurança:**

Depois de implementar tudo, que tal explorar esses pacotes de segurança?

#### **🚦 express-rate-limit** - Proteger contra ataques
```bash
npm install express-rate-limit
```

**O que faz:**
- Limita quantas requisições um IP pode fazer
- Protege contra ataques de força bruta no login
- Evita spam na API

**Exemplo básico:**
```javascript
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 tentativas de login
  message: 'Muitas tentativas de login. Tente novamente em 15 minutos.'
});

// Usar na rota de login
app.use('/auth/login', loginLimiter);
```

#### **🔒 helmet** - Headers de segurança
```bash
npm install helmet
```

**O que faz:**
- Adiciona headers de segurança automaticamente
- Protege contra ataques XSS, clickjacking, etc.
- Uma linha de código = várias proteções

**Exemplo básico:**
```javascript
import helmet from 'helmet';

app.use(helmet()); // Uma linha protege sua API!
```

### **Por que isso é importante?**
- **APIs reais** sempre usam essas proteções
- **Rate limiting** é obrigatório em produção
- **Headers de segurança** evitam vulnerabilidades comuns
- **Empregadores** valorizam conhecimento de segurança

### **Quer saber mais?**
- [Express Rate Limit Docs](https://www.npmjs.com/package/express-rate-limit)
- [Helmet.js Docs](https://helmetjs.github.io/)
- [OWASP Security Headers](https://owasp.org/www-project-secure-headers/)

*"Segurança não é opcional - é essencial!"* 🔐