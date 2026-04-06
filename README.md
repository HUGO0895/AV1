# 🛩️ AeroCode - Documentação Técnica e Manual do Usuário
---

## 1. Visão Geral do Sistema

O **AeroCode** é um sistema de gerenciamento de produção e manutenção de aeronaves desenvolvido em TypeScript para execução em linha de comando (CLI). O sistema permite o controle completo do ciclo de vida de uma aeronave, desde a adição de peças e etapas de produção até a realização de testes e geração de relatórios de entrega.

### 1.1 Principais Funcionalidades

- Cadastro, atualização, remoção e listagem de aeronaves
- Gerenciamento de peças (nacionais/importadas) com controle de status
- Controle de etapas de produção com prazos e responsáveis
- Realização de testes elétricos, hidráulicos e aerodinâmicos
- Gerenciamento de usuários com diferentes níveis de permissão
- Geração de relatórios de entrega em formato TXT
- Persistência de dados em arquivos JSON

### 1.2 Níveis de Acesso

| Nível | Permissões |
|-------|-------------|
| ADMINISTRADOR | Acesso total a todas as funcionalidades do sistema |
| ENGENHEIRO | Gerenciamento de testes, visualização de aeronaves e geração de relatórios |
| OPERADOR | Atualização de status de peças/etapas e atribuição de funcionários |

---

## 2. Arquitetura

### 2.1 Estrutura de Diretórios
```
├── 📁 cli
│   ├── 📄 appAero.ts
│   ├── 📄 appEtapa.ts
│   ├── 📄 appFunc.ts
│   ├── 📄 appPeca.ts
│   ├── 📄 appRelatorio.ts
│   └── 📄 appTeste.ts
├── 📁 database
│   ├── 📁 relatorios
│   │   ├── 📄 TR-200Mon Apr 06 2026 17:23:55 GMT-0300 (Horário Padrão de Brasília)RELATORIO.txt
│   │   └── 📄 TR-200Sun Apr 05 2026 19:28:36 GMT-0300 (Horário Padrão de Brasília)RELATORIO.txt
│   ├── ⚙️ aeronaves.json
│   └── ⚙️ funcionarios.json
├── 📁 models
│   ├── 📁 aeronave
│   │   ├── 📄 aeronave.ts
│   │   └── 📄 tipoaeronave.ts
│   ├── 📁 entrada-saida
│   │   └── 📄 io.ts
│   ├── 📁 etapas
│   │   ├── 📄 etapas.ts
│   │   └── 📄 status_etapas.ts
│   ├── 📁 funcionario
│   │   ├── 📄 funcionario.ts
│   │   └── 📄 nivelPermissao.ts
│   ├── 📁 pecas
│   │   ├── 📄 pecas.ts
│   │   └── 📄 typePecas.ts
│   ├── 📁 relatorios
│   │   └── 📄 relatorio.ts
│   └── 📁 teste
│       ├── 📄 enumsTeste.ts
│       └── 📄 teste.ts
├── 📁 service
│   ├── 📄 aeronaveService.ts
│   ├── 📄 etapa.Service.ts
│   ├── 📄 funcionarioService.ts
│   ├── 📄 peca.Service.ts
│   └── 📄 teste.Service.ts
├── 📝 README.md
├── 📄 app.ts
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 🐍 testes.py
└── ⚙️ tsconfig.json
```

---

### 2.2 Fluxo de Dados
```
Usuário → CLI → Service → File System (JSON) → Database
           ↓
    Regras de Negócio
           ↓
    Retorno ao Usuário

```

### 2.3 Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|------------|--------|-------------|
| TypeScript | 5.x | Linguagem principal |
| Node.js | 14+ | Ambiente de execução |
| prompt-sync | 4.x | Entrada de dados síncrona |
| File System (fs) | nativo | Persistência em JSON |
|crypto|nativo|Ids diferentes|

# Manual do Usuário
## Inicialização
```
git clone <esse repositorio>
cd AV1
$ npx ts-node app.ts
```
## Login
```
Aerocode CLI
1- Fazer Login
Outro- Sair
Escolha: 1
