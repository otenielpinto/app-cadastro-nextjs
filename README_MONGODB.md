# API de Cadastro de Clientes com MongoDB

## 🚀 Configuração Rápida

### 1. Instalar MongoDB

**Opção A: MongoDB Local**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mongodb

# macOS
brew install mongodb/brew/mongodb-community

# Windows
# Baixar do site oficial: https://www.mongodb.com/try/download/community
```

**Opção B: MongoDB Atlas (Nuvem)**

1. Criar conta gratuita no [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Criar um cluster gratuito
3. Obter a string de conexão

### 2. Configurar Variáveis de Ambiente

Criar arquivo `.env.local`:

```bash
# Para MongoDB Local
MONGO_CONNECTION=mongodb://localhost:27017
MONGO_DATABASE=embalamix

# Para MongoDB Atlas
# MONGO_CONNECTION=mongodb+srv://username:password@cluster.mongodb.net/
# MONGO_DATABASE=embalamix
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Executar Aplicação

```bash
npm run dev
```

## 📁 Estrutura da Implementação

### Server Action (`/src/actions/clienteAction.ts`)

- ✅ Função `createCliente()` implementada
- ✅ Validações completas
- ✅ Conexão com MongoDB
- ✅ Tratamento de erros
- ✅ Logs detalhados

### API Route (`/src/app/api/clientes/route.ts`)

- ✅ POST endpoint simplificado
- ✅ Usa server action internamente
- ✅ Compatível com frontend

### Database

- ✅ Collection: `tmp_cliente`
- ✅ Auto-geração de ID único
- ✅ Timestamps automáticos

## 🔧 Como Usar

### Via API REST

```javascript
const response = await fetch("/api/clientes", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(clientData),
});

const result = await response.json();
```

### Via Server Action (Direto)

```javascript
import { createCliente } from "@/actions/clienteAction";

const result = await createCliente(clientData);
```

## 📊 Exemplo de Dados

```json
{
  "nomeCompleto": "João Silva Santos",
  "cpfCnpj": "12345678900",
  "inscricaoEstadual": "123456789",
  "cep": "01234567",
  "endereco": "Rua das Flores, 123",
  "numero": "456",
  "complemento": "Apto 101",
  "localEntrega": "Portaria do prédio",
  "horarioInicio": "08:00",
  "horarioFim": "18:00",
  "diasSemana": ["segunda", "terca", "quarta"],
  "temAlmoco": true,
  "almocoInicio": "12:00",
  "almocoFim": "13:00",
  "nomeComprador": "Maria Silva",
  "telefoneFixo1": "(11) 1234-5678",
  "telefoneFixo2": "",
  "whatsapp": "(11) 91234-5678",
  "email": "joao@email.com",
  "emailNF": "financeiro@empresa.com"
}
```

## ✅ Validações Implementadas

- **Nome completo**: Obrigatório
- **CPF/CNPJ**: Obrigatório, 11 ou 14 dígitos
- **Email**: Obrigatório, formato válido
- **CEP**: Obrigatório
- **Endereço**: Obrigatório
- **Número**: Obrigatório
- **Local de entrega**: Obrigatório
- **Nome do comprador**: Obrigatório
- **Dias da semana**: Pelo menos um

## 📝 Resposta da API

```json
{
  "success": true,
  "message": "Cliente cadastrado com sucesso",
  "data": {
    "id": "l9xyz123abc",
    "nomeCompleto": "João Silva Santos",
    "cpfCnpj": "12345678900",
    "email": "joao@email.com",
    "createdAt": "2025-09-25T14:30:00.000Z"
  }
}
```

## 🚨 Troubleshooting

### Erro de Conexão MongoDB

```bash
# Verificar se MongoDB está rodando
sudo systemctl status mongod

# Iniciar MongoDB
sudo systemctl start mongod
```

### Variáveis de Ambiente

- Verificar se `.env.local` existe
- Confirmar strings de conexão
- Reiniciar servidor após mudanças

### Logs de Debug

- Verificar console do servidor
- Logs da server action são exibidos
- Erros detalhados na resposta

## 🔄 Fluxo de Funcionamento

1. **Frontend** → envia dados via fetch
2. **API Route** → recebe e chama server action
3. **Server Action** → valida, conecta MongoDB, salva
4. **MongoDB** → armazena na collection `tmp_cliente`
5. **Response** → retorna dados do cliente criado

A implementação está **completa e funcional**! 🎯
