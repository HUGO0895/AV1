# Aerocode CLI — Documentação do Sistema

## Sumário

1. [Visão Geral](#visão-geral)
2. [Arquitetura do Projeto](#arquitetura-do-projeto)
3. [Fluxo de Autenticação](#fluxo-de-autenticação)
4. [Níveis de Permissão](#níveis-de-permissão)
5. [Modelos (Models)](#modelos-models)
   - [Aeronave](#aeronave-model)
   - [Funcionário](#funcionário-model)
   - [Etapas](#etapas-model)
   - [Peças](#peças-model)
   - [Teste](#teste-model)
   - [Relatório](#relatório-model)
   - [Entrada / IO](#entrada--io)
6. [Enums](#enums)
7. [Módulos CLI](#módulos-cli)
   - [Aeronaves](#aeronaves)
   - [Funcionários](#funcionários)
   - [Peças](#peças)
   - [Etapas](#etapas)
   - [Testes](#testes)
   - [Relatórios](#relatórios)
8. [Camada de Serviços](#camada-de-serviços)
9. [Persistência de Dados](#persistência-de-dados)
10. [Regras de Negócio](#regras-de-negócio)
11. [Menus da CLI](#menus-da-cli)

---

## Visão Geral

**Aerocode** é uma aplicação de linha de comando (CLI) desenvolvida em TypeScript para gerenciamento de aeronaves em um contexto de produção aeronáutica. O sistema permite controlar o ciclo de vida de uma aeronave — desde o cadastro até a geração de relatórios — passando por peças, etapas de produção e testes de validação.

### COMO  RODAR?(Esse projeto usa a versão v22.22.1 do NODEJS)
```
git clone git@github.com:HUGO0895/AV1.git
cd AV1
npm i
npx ts-node app.ts
```
---

## Arquitetura do Projeto

```
src/
├── app.ts                      # Ponto de entrada e orquestrador da CLI
├── cli/
│   ├── appAero.ts              # Interface CLI de Aeronaves
│   ├── appFunc.ts              # Interface CLI de Funcionários
│   ├── appPeca.ts              # Interface CLI de Peças
│   ├── appEtapa.ts             # Interface CLI de Etapas
│   ├── appTeste.ts             # Interface CLI de Testes
│   └── appRelatorio.ts         # Interface CLI de Relatórios
├── service/
│   ├── aeronaveService.ts      # CRUD de Aeronaves
│   ├── funcionarioService.ts   # CRUD de Funcionários
│   ├── peca.Service.ts         # CRUD de Peças
│   ├── etapa.Service.ts        # CRUD de Etapas
│   └── teste.Service.ts        # CRUD de Testes
├── models/
│   ├── aeronave/
│   │   ├── aeronave.ts         # Classe Aeronave
│   │   └── tipoaeronave.ts     # Enum TipoAeronave
│   ├── funcionario/
│   │   ├── funcionario.ts      # Classe Funcionario
│   │   └── nivelPermissao.ts   # Enum NivelPermissao
│   ├── pecas/
│   │   ├── pecas.ts            # Classe Pecas
│   │   └── typePecas.ts        # Enums TiposPecas e StatusPecas
│   ├── etapas/
│   │   ├── etapas.ts           # Classe Etapas
│   │   └── status_etapas.ts    # Enum StatusEtapas
│   ├── teste/
│   │   ├── teste.ts            # Classe Teste
│   │   └── enumsTeste.ts       # Enums TipoTeste e Resultado
│   ├── relatorios/
│   │   └── relatorio.ts        # Classe Relatorio
│   └── entrada-saida/
│       └── io.ts               # Classe Entrada (leitura do terminal)
└── database/
    ├── aeronaves.json
    ├── funcionarios.json
    └── relatorios/             # Arquivos .txt gerados
```

---

## Fluxo de Autenticação

```
interfaceInicial()
    └── Login()
            ├── [sucesso] → verifica nivelPermissao
            │       ├── ADMINISTRADOR → interfaceADMIN()
            │       ├── ENGENHEIRO    → interfaceENGENHEIRO()
            │       └── OPERADOR      → interfaceOperador()
            └── [falha] → retorna para interfaceInicial()
```

A autenticação é feita via `usuario` e `senha`. O método `getFuncAuth()` do `FuncService` varre o arquivo `funcionarios.json` e retorna um par `[boolean, Funcionario | null]`.

---

## Níveis de Permissão

| Nível           | Descrição                                                                  |
|-----------------|----------------------------------------------------------------------------|
| `ADMINISTRADOR` | Acesso total: usuários, aeronaves, peças, etapas, testes e relatórios     |
| `ENGENHEIRO`    | Gerencia testes, visualiza aeronaves/peças e gera relatórios              |
| `OPERADOR`      | Lista aeronaves, atualiza status de peças e etapas, adiciona funcionários |

---

## Modelos (Models)

### Aeronave (Model)

**Arquivo:** `models/aeronave/aeronave.ts`

Representa uma aeronave no sistema. Agrega peças, etapas e testes.

**Propriedades:**

| Propriedade  | Tipo          | Visibilidade | Descrição                              |
|--------------|---------------|--------------|----------------------------------------|
| `id`         | string        | private      | Identificador único                    |
| `modelo`     | string        | public       | Modelo da aeronave                     |
| `tipo`       | TipoAeronave  | public       | `COMERCIAL` ou `MILITAR`               |
| `capacidade` | number        | public       | Capacidade de passageiros              |
| `alcance`    | number        | public       | Alcance em km                          |
| `pecas`      | Pecas[]       | public       | Lista de peças                         |
| `etapas`     | Etapas[]      | public       | Lista de etapas de produção            |
| `testes`     | Testes[]      | public       | Lista de testes                        |

**Métodos públicos:**

| Método              | Retorno | Descrição                                                      |
|---------------------|---------|----------------------------------------------------------------|
| `getId`             | string  | Getter do ID                                                   |
| `detalhes()`        | void    | Exibe uma tabela formatada no console com os dados da aeronave |
| `RelatorioPecas()`  | string  | Retorna string formatada das peças para uso no relatório       |
| `RelatorioRtapas()` | string  | Retorna string formatada das etapas para uso no relatório      |
| `RelatorioTestes()` | string  | Retorna string formatada dos testes para uso no relatório      |

**Exemplo de saída do método `detalhes()` no terminal:**
```
---------------------------
|  Aeronave:AER-001       |
---------------------------
|  Modelo:Boeing 737      |
---------------------------
|  Peças:Motor,Asa        |
---------------------------
|  Etapas:Montagem        |
---------------------------
|  Testes:ELETRICO        |
---------------------------
|  Capacidade:180         |
---------------------------
|  Alcance:5000           |
---------------------------
```

---

### Funcionário (Model)

**Arquivo:** `models/funcionario/funcionario.ts`

Representa um usuário do sistema. O ID é gerado automaticamente via hash SHA-256 com base em um contador estático.

**Propriedades:**

| Propriedade      | Tipo           | Visibilidade    | Descrição                             |
|------------------|----------------|-----------------|---------------------------------------|
| `id`             | string         | private         | Hash SHA-256 gerado automaticamente   |
| `nome`           | string         | public          | Nome completo                         |
| `telefone`       | string         | public          | Telefone de contato                   |
| `endereco`       | string         | public          | Endereço                              |
| `usuario`        | string         | public          | Nome de usuário para login            |
| `senha`          | string         | public          | Senha                                 |
| `nivelPermissao` | NivelPermissao | public          | Nível de acesso ao sistema            |
| `contador`       | number         | private static  | Contador global para geração de IDs   |

**Métodos:**

| Método   | Retorno | Descrição                                          |
|----------|---------|----------------------------------------------------|
| `show()` | void    | Exibe os dados do funcionário em tabela no console |
| `Id`     | string  | Getter do ID                                       |

> **Nota:** O ID é gerado com `createHash('sha256').update(contador).digest('hex')`, garantindo unicidade por sessão de execução.

---

### Etapas (Model)

**Arquivo:** `models/etapas/etapas.ts`

Representa uma etapa do processo de fabricação de uma aeronave.

**Propriedades:**

| Propriedade    | Tipo           | Descrição                                    |
|----------------|----------------|----------------------------------------------|
| `nome`         | string         | Nome da etapa                                |
| `prazo`        | string         | Data limite no formato `DIA/MÊS/ANO`         |
| `status`       | StatusEtapas   | Status atual (padrão ao criar: `PENDENTE`)   |
| `funcionarios` | Funcionario[]  | Funcionários responsáveis pela etapa         |

**Métodos:**

| Método                      | Descrição                                             |
|-----------------------------|-------------------------------------------------------|
| `iniciar()`                 | Define o status como `ANDAMENTO`                      |
| `finalizar()`               | Define o status como `CONCLUIDA`                      |
| `adiconarFunc(funcionario)` | Adiciona um funcionário à lista da etapa              |
| `mostrare()`                | Retorna `"nome Status: status"` para uso no relatório |

---

### Peças (Model)

**Arquivo:** `models/pecas/pecas.ts`

Representa uma peça associada a uma aeronave.

**Propriedades:**

| Propriedade  | Tipo        | Descrição                 |
|--------------|-------------|---------------------------|
| `name`       | string      | Nome da peça              |
| `tipo`       | TiposPecas  | `NACIONAL` ou `IMPORTADA` |
| `fornecedor` | string      | Nome do fornecedor        |
| `status`     | StatusPecas | Status atual da peça      |

**Métodos:**

| Método                     | Descrição                                                |
|----------------------------|----------------------------------------------------------|
| `atualizar_status(status)` | Atualiza o status da peça                                |
| `mostrarP()`               | Retorna `"nome (Fornecedor: X, Tipo: Y)"` para relatório |

---

### Teste (Model)

**Arquivo:** `models/teste/teste.ts`

Representa um teste de validação realizado na aeronave. Cada aeronave suporta no máximo **3 testes**.

**Propriedades:**

| Propriedade | Tipo      | Descrição                                    |
|-------------|-----------|----------------------------------------------|
| `tipo`      | TipoTeste | `ELETRICO`, `HIDRAULICO` ou `AERODINAMICO`   |
| `resultado` | Resultado | `APROVADO` ou `REPROVADO`                    |

**Métodos:**

| Método           | Descrição                                        |
|------------------|--------------------------------------------------|
| `mostarTeste()`  | Retorna `"Tipo: X Resultado: Y"` para relatório  |

---

### Relatório (Model)

**Arquivo:** `models/relatorios/relatorio.ts`

Gera um arquivo `.txt` de relatório de entrega de aeronave, com validações de aprovação.

**Método principal:**

```typescript
gerarRelatorio(id: string, dataentrega: string, cliente: string): Promise<void>
```

**Fluxo interno:**

1. Lê `aeronaves.json` e localiza a aeronave pelo ID
2. Reconstrói os objetos `Aeronave`, `Pecas`, `Etapas` e `Teste` a partir do JSON
3. Verifica se alguma etapa tem status diferente de `CONCLUIDA` → lança erro
4. Verifica se algum teste tem resultado `REPROVADO` → lança erro
5. Monta a string do relatório e salva em `./database/relatorios/{id}{timestamp}RELATORIO.txt`

**Estrutura do arquivo `.txt` gerado:**

```
AEROCODE- RELATORIO DE ENTREGA

Data de Emissão: DD/MM/AAAA
Cliente: [nome do cliente]
Data de Entrega: [data informada]
===========================
DADOS DA AERONAVE
-----------------
Código: [id]
Modelo: [modelo]
Tipo: [tipo]
Capacidade: [capacidade]

PEÇAS UTILIZADAS
----------------
[lista de peças]

ETAPA DE PRODUÇÃO
-----------------
[lista de etapas e status]

Resultado dos Testes
--------------------
[lista de testes e resultados]
===========================
AERONAVE APROVADA
```

---

### Entrada / IO

**Arquivo:** `models/entrada-saida/io.ts`

Abstrai a leitura de dados do terminal usando a biblioteca `prompt-sync`.

**Métodos:**

| Método                   | Retorno | Descrição                                                |
|--------------------------|---------|----------------------------------------------------------|
| `receberNumero(message)` | number  | Lê um número; lança `Error` se o valor não for numérico  |
| `receberTexto(message)`  | string  | Lê uma string do terminal                                |

> **Nota:** A opção `{ sigint: true }` permite encerrar o programa com `CTRL+C`.

---

## Enums

### TipoAeronave — `tipoaeronave.ts`

| Valor       | String        |
|-------------|---------------|
| `COMERCIAL` | `"COMERCIAL"` |
| `MILITAR`   | `"MILITAR"`   |

### NivelPermissao — `nivelPermissao.ts`

| Valor           | String            |
|-----------------|-------------------|
| `ADMINISTRADOR` | `"ADMINISTRADOR"` |
| `ENGENHEIRO`    | `"ENGENHEIRO"`    |
| `OPERADOR`      | `"OPERADOR"`      |

### StatusEtapas — `status_etapas.ts`

| Valor       | String        |
|-------------|---------------|
| `Pendente`  | `"PENDENTE"`  |
| `ANDAMENTO` | `"ANDAMENTO"` |
| `Concluida` | `"CONCLUIDA"` |

### TiposPecas — `typePecas.ts`

| Valor      | String        |
|------------|---------------|
| `NACIONAL` | `"NACIONAL"`  |
| `IMPORTADA`| `"IMPORTADA"` |

### StatusPecas — `typePecas.ts`

| Valor           | String            |
|-----------------|-------------------|
| `EM_PRODUCAO`   | `"EM PRODUÇÃO"`   |
| `EM_TRANSPORTE` | `"EM TRANSPORTE"` |
| `PRONTA`        | `"PRONTA"`        |

### TipoTeste — `enumsTeste.ts`

| Valor          | String           |
|----------------|------------------|
| `ELETRICO`     | `"ELETRICO"`     |
| `HIDRAULICO`   | `"HIDRAULICO"`   |
| `AERODINAMICO` | `"AERODINAMICO"` |

### Resultado — `enumsTeste.ts`

| Valor       | String        |
|-------------|---------------|
| `APROVADO`  | `"APROVADO"`  |
| `REPROVADO` | `"REPROVADO"` |

---

## Módulos CLI

### Aeronaves

**Arquivo:** `cli/appAero.ts` | **Service:** `aeronaveService.ts`

| Método        | Descrição                                                  |
|---------------|------------------------------------------------------------|
| `adicionar()` | Coleta dados via terminal e cadastra nova aeronave         |
| `deletar()`   | Remove aeronave pelo ID informado                          |
| `atualizar()` | Atualiza campos opcionais (campos em branco são ignorados) |
| `Ver()`       | Exibe todas as aeronaves com o método `detalhes()`         |

---

### Funcionários

**Arquivo:** `cli/appFunc.ts` | **Service:** `funcionarioService.ts`

| Método              | Descrição                                           |
|---------------------|-----------------------------------------------------|
| `adicionar()`       | Cadastra novo funcionário                           |
| `remover()`         | Remove funcionário pelo ID                          |
| `put()`             | Atualiza dados (campos em branco são ignorados)     |
| `Ver()`             | Lista todos os funcionários                         |
| `Auth(user, senha)` | Autentica e retorna `[boolean, Funcionario\|null]`  |

---

### Peças

**Arquivo:** `cli/appPeca.ts` | **Service:** `peca.Service.ts`

| Método        | Descrição                                      |
|---------------|------------------------------------------------|
| `adicionar()` | Adiciona peça a uma aeronave (por ID)          |
| `deletar()`   | Remove peça pelo nome                          |
| `put()`       | Atualiza o status de uma peça                  |
| `read()`      | Lista todas as peças de todas as aeronaves     |

---

### Etapas

**Arquivo:** `cli/appEtapa.ts` | **Service:** `etapa.Service.ts`

| Método        | Descrição                                           |
|---------------|-----------------------------------------------------|
| `adicionar()` | Cria nova etapa em uma aeronave                     |
| `deletar()`   | Remove etapa pelo nome                              |
| `put()`       | Atualiza status da etapa                            |
| `read()`      | Lista todas as etapas com funcionários responsáveis |
| `addF()`      | Associa um funcionário (por `usuario`) a uma etapa  |

---

### Testes

**Arquivo:** `cli/appTeste.ts` | **Service:** `teste.Service.ts`

| Método        | Descrição                                       |
|---------------|-------------------------------------------------|
| `adicionar()` | Adiciona teste a uma aeronave                   |
| `deletar()`   | Remove teste pelo tipo                          |
| `put()`       | Atualiza resultado de um teste                  |
| `read()`      | Lista todos os testes de todas as aeronaves     |

---

### Relatórios

**Arquivo:** `cli/appRelatorio.ts` | **Model:** `relatorio.ts`

| Método              | Descrição                                                |
|---------------------|----------------------------------------------------------|
| `GerarRelatorio()`  | Coleta ID, data de entrega e cliente; gera arquivo `.txt`|

---

## Camada de Serviços

Todos os serviços seguem o mesmo padrão de acesso ao banco de dados (arquivos JSON):

| Método   | Descrição                             |
|----------|---------------------------------------|
| `create` | Lê o JSON, adiciona o item, salva     |
| `put`    | Lê o JSON, atualiza o item, salva     |
| `del`    | Lê o JSON, filtra o item, salva       |
| `read`   | Lê o JSON e exibe os dados no console |

---

## Persistência de Dados

O sistema utiliza arquivos JSON como banco de dados local, em `./database/`:

**`aeronaves.json`** — armazena aeronaves com peças, etapas e testes aninhados:

```json
[
  {
    "id": "AER-001",
    "modelo": "Boeing 737",
    "capacidade": 180,
    "alcance": 5000,
    "tipo": "COMERCIAL",
    "pecas": [
      { "name": "Motor", "tipo": "IMPORTADA", "fornecedor": "GE Aviation", "status": "PRONTA" }
    ],
    "etapas": [
      { "nome": "Montagem", "prazo": "10/06/2025", "status": "CONCLUIDA", "funcionarios": [] }
    ],
    "testes": [
      { "tipo": "ELETRICO", "resultado": "APROVADO" }
    ]
  }
]
```

**`funcionarios.json`** — armazena os funcionários cadastrados:

```json
[
  {
    "id": "a3f1c2...",
    "nome": "João Silva",
    "telefone": "11999999999",
    "endereco": "Rua A, 123",
    "usuario": "joao.silva",
    "senha": "senha123",
    "nivelPermissao": "ADMINISTRADOR"
  }
]
```

**`relatorios/`** — arquivos `.txt` gerados automaticamente com nome no padrão `{id}{timestamp}RELATORIO.txt`.

---

## Regras de Negócio

- **Etapas — bloqueio de criação:** Não é possível adicionar uma nova etapa se existir qualquer etapa com status `PENDENTE` em qualquer aeronave.
- **Testes — bloqueio por etapas:** Não é possível adicionar um teste se houver alguma etapa com status `PENDENTE`.
- **Testes — limite:** Cada aeronave suporta no máximo **3 testes**.
- **Relatório — etapas:** O relatório só pode ser gerado se todas as etapas estiverem com status `CONCLUIDA`.
- **Relatório — testes:** O relatório não pode ser gerado se houver algum teste com resultado `REPROVADO`.
- **Atualização:** Campos em branco durante a atualização de aeronaves ou funcionários são ignorados, mantendo o valor anterior.
- **Status de Peças:** Caso um valor inválido seja informado, o status padrão atribuído é `PRONTA`.
- **ID de Funcionário:** Gerado automaticamente via SHA-256 a partir de um contador estático — não é informado manualmente pelo usuário.

---

## Menus da CLI

### Menu Inicial
```
Aerocode CLI
1- Fazer Login
Outro- Sair
```

### Menu Administrador
```
Menu do Admin
1- Gerenciar Usuarios
2- Gerenciar Aeronaves
3- Gerenciar Peças
4- Gerenciar Etapas
5- Gerenciar Testes
6- Gerar Relatório de uma Aeronave
CTL+C- Sair
```

### Menu Engenheiro
```
Menu do Engenheiro
1- Gerenciar Testes (Elétricos, Hidráulicos, Aerodinâmicos)
2- Visualizar Aeronaves e Peças
3- Gerar Relatório de Produção
CTL+C- Sair
```

### Menu Operador
```
Menu do Operador
1- Listar Aeronaves Designadas
2- Mudar status de uma Peça
3- Atualizar Status de Etapas
4- Adicionar Funcionarios a Etapas
5- Ver Todas as Peças no Estoque
CTL+C- Sair
```
