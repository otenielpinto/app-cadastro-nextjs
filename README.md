# Sistema de Cadastro de Clientes

Sistema de cadastro de clientes com formulário multi-step desenvolvido em Next.js e React.

## 🚀 Funcionalidades

- **Formulário Multi-Step**: Dividido em 3 etapas (Dados Básicos, Endereço, Contato)
- **Validação em Tempo Real**: Validação de campos obrigatórios e formatos
- **Máscaras de Input**: CPF/CNPJ, CEP, telefones formatados automaticamente
- **Interface Responsiva**: Design adaptável para desktop e mobile
- **Indicador de Progresso**: Visualização clara do progresso do cadastro
- **Navegação Intuitiva**: Botões de próximo/anterior com validação
- **Feedback Visual**: Mensagem de sucesso ao finalizar o cadastro

## 🛠️ Tecnologias Utilizadas

- **Next.js 15.5.4**: Framework React para produção
- **React 19.1.0**: Biblioteca para construção da interface
- **TypeScript**: Tipagem estática para melhor desenvolvimento
- **Tailwind CSS**: Framework CSS utilitário para estilização
- **React Hooks**: Gerenciamento de estado e efeitos

## 📦 Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página principal
│   └── modelo.html          # Modelo HTML original
├── components/
│   ├── CadastroCliente.tsx  # Componente principal
│   ├── ProgressIndicator.tsx # Indicador de progresso
│   ├── SuccessMessage.tsx   # Mensagem de sucesso
│   └── steps/
│       ├── DadosBasicos.tsx # Etapa 1 - Dados básicos
│       ├── Endereco.tsx     # Etapa 2 - Endereço
│       └── Contato.tsx      # Etapa 3 - Contato
├── hooks/
│   └── useFormUtils.ts      # Hooks para validação e máscaras
└── types/
    └── client.ts            # Tipos TypeScript
```

## 🎯 Etapas do Formulário

### 1. Dados Básicos
- Nome Completo / Razão Social
- CPF / CNPJ (com máscara automática)
- Inscrição Estadual (opcional)

### 2. Endereço
- CEP (com máscara)
- Endereço completo
- Número e complemento
- Local de entrega alternativo
- Horário de funcionamento
- Dias da semana de operação
- Horário de almoço (opcional)

### 3. Contato
- Nome do comprador
- Telefones fixos
- WhatsApp (obrigatório)
- E-mail principal
- E-mail para nota fiscal

## 🚀 Como Executar

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd app-cadastro-nextjs
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📱 Responsividade

O sistema é totalmente responsivo, adaptando-se automaticamente para:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## ✅ Validações Implementadas

- **Campos obrigatórios**: Validação de preenchimento
- **Formato de e-mail**: Validação de formato válido
- **CPF/CNPJ**: Validação de tamanho (11 ou 14 dígitos)
- **Navegação**: Impede avançar sem preencher campos obrigatórios

## 🎨 Design

- **Gradientes**: Uso de gradientes modernos para botões e indicadores
- **Transições**: Animações suaves entre etapas
- **Feedback Visual**: Estados visuais para campos com erro
- **Tipografia**: Fonte Inter para melhor legibilidade

## 📄 Scripts Disponíveis

- `npm run dev`: Executa em modo de desenvolvimento
- `npm run build`: Gera build de produção
- `npm run start`: Executa build de produção
- `npm run lint`: Executa linting do código

## 🔮 Próximas Melhorias

- [ ] Integração com API backend
- [ ] Persistência de dados no localStorage
- [ ] Validação de CEP com API dos Correios
- [ ] Testes unitários e de integração
- [ ] PWA (Progressive Web App)
- [ ] Modo escuro

## 📝 Licença

Este projeto está sob a licença MIT.
