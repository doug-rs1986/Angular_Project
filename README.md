# Cliente Onboarding - SPA Angular

Uma aplicação Angular moderna para onboarding de clientes pessoa física, desenvolvida como Single Page Application (SPA) com interface intuitiva e responsiva.

## 🚀 Características

- **Aplicação Multi-Step**: Processo de onboarding dividido em etapas claras e organizadas
- **Interface Moderna**: Design responsivo e intuitivo com animações suaves
- **Validação Robusta**: Validação em tempo real com feedback visual
- **Integração com APIs**: Consulta automática de CEP via ViaCEP
- **Signals**: Utiliza a nova API de Signals do Angular para gerenciamento de estado
- **TypeScript**: Totalmente tipado para melhor desenvolvimento e manutenção

## 📋 Funcionalidades

### 1. Dados Pessoais
- Nome completo
- Data de nascimento
- Email com validação
- Telefone com máscara automática
- Gênero
- Estado civil

### 2. Documentos
- CPF com validação e formatação
- RG com órgão emissor e data de emissão
- CNH (opcional) com categoria e validade

### 3. Endereço
- CEP com busca automática
- Logradouro, número e complemento
- Bairro, cidade e estado
- Preenchimento automático via API ViaCEP

### 4. Informações Profissionais
- Nome da empresa
- Cargo/função atual
- Área de atuação (lista predefinida)
- Tempo de experiência (anos e meses)
- Renda mensal com formatação de moeda
- Data de início no cargo

### 5. Resumo e Finalização
- Visualização completa dos dados informados
- Opção de editar qualquer seção
- Finalização do cadastro

## 🛠️ Tecnologias Utilizadas

- **Angular 19** (versão mais recente)
- **TypeScript**
- **Reactive Forms** para validações
- **Angular Router** para navegação entre etapas
- **Signals** para gerenciamento de estado
- **CSS Grid e Flexbox** para layout responsivo
- **API ViaCEP** para consulta de endereços

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Angular CLI

### Instalação
```bash
# Navegue para o diretório do projeto
cd client-onboarding

# Instale as dependências
npm install

# Execute a aplicação
ng serve

# Acesse http://localhost:4200
```

### Build para Produção
```bash
# Build para produção
ng build

# Os arquivos serão gerados na pasta dist/
```

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona perfeitamente em:
- Desktop (1024px+)
- Tablets (768px - 1023px)
- Smartphones (até 767px)

## 🎨 Design System

### Cores Principais
- **Azul Principal**: #3498db
- **Azul Escuro**: #2980b9
- **Verde Sucesso**: #27ae60
- **Vermelho Erro**: #e74c3c
- **Cinza Texto**: #2c3e50

### Tipografia
- **Fonte Principal**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Tamanhos**: 14px (mobile), 16px (desktop)

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── onboarding/          # Componente principal com stepper
│   │   ├── personal-data/       # Formulário de dados pessoais
│   │   ├── documents/           # Formulário de documentos
│   │   ├── address/             # Formulário de endereço
│   │   ├── professional-info/   # Formulário profissional
│   │   └── summary/             # Resumo e finalização
│   ├── interfaces/
│   │   └── client.interface.ts  # Interfaces TypeScript
│   ├── services/
│   │   └── onboarding.ts        # Serviço de gerenciamento de dados
│   ├── app.routes.ts            # Configuração de rotas
│   └── app.ts                   # Componente raiz
```

## 🔧 Serviços

### OnboardingService
Gerencia o estado global da aplicação usando Signals:
- `updatePersonalData()` - Atualiza dados pessoais
- `updateDocuments()` - Atualiza documentos
- `updateAddress()` - Atualiza endereço
- `updateProfessionalInfo()` - Atualiza info profissional
- `isStepComplete()` - Verifica se etapa está completa
- `searchAddressByZipCode()` - Busca endereço por CEP

## 🎯 Validações Implementadas

- **Email**: Formato válido
- **CPF**: Formato XXX.XXX.XXX-XX
- **Telefone**: Formato (XX) XXXXX-XXXX
- **CEP**: Formato XXXXX-XXX
- **Campos obrigatórios**: Marcados com asterisco (*)
- **Validação condicional**: CNH só é obrigatória se informada

## 🌐 APIs Utilizadas

- **ViaCEP**: `https://viacep.com.br/ws/{cep}/json/`
  - Consulta automática de endereço por CEP
  - Preenchimento automático dos campos de endereço

## ✨ Próximas Melhorias

- [ ] Implementar backend para persistência dos dados
- [ ] Adicionar autenticação de usuário
- [ ] Implementar upload de documentos
- [ ] Adicionar validação de CPF (algoritmo)
- [ ] Implementar notificações por email
- [ ] Adicionar progress bar com porcentagem
- [ ] Implementar PWA (Progressive Web App)
- [ ] Adicionar testes unitários e e2e

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato através dos issues do GitHub.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
