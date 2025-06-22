# Guia de Uso da API - Frontend

Este guia explica como usar os serviços de API criados para conectar o frontend com o backend.

## Estrutura dos Arquivos

```
src/
├── types/
│   └── api.ts              # Tipos TypeScript para a API
├── services/
│   ├── api.ts              # Serviço base para requisições HTTP
│   ├── clienteService.ts   # Serviços para clientes
│   ├── petService.ts       # Serviços para pets
│   ├── servicoService.ts   # Serviços para serviços
│   ├── produtoService.ts   # Serviços para produtos
│   └── index.ts            # Exportações de todos os serviços
├── hooks/
│   ├── useApi.ts           # Hook base para operações de API
│   ├── useCliente.ts       # Hooks para clientes
│   ├── usePet.ts           # Hooks para pets
│   ├── useServico.ts       # Hooks para serviços
│   ├── useProduto.ts       # Hooks para produtos
│   └── index.ts            # Exportações de todos os hooks
├── utils/
│   └── apiUtils.ts         # Utilitários para formatação e validação
└── components/
    └── examples/
        └── ClienteExample.tsx  # Exemplo de uso dos serviços
```

## Como Usar

### 1. Importando os Serviços

```typescript
// Importar serviços específicos
import { clienteService, petService, servicoService, produtoService } from '../services';

// Ou importar todos os serviços
import * as services from '../services';
```

### 2. Usando os Hooks (Recomendado)

Os hooks fornecem uma maneira fácil de gerenciar estado de loading, erro e dados:

```typescript
import { useClientes, useCreateCliente, useUpdateCliente, useDeleteCliente } from '../hooks';

function ClienteComponent() {
    const { 
        data: clientes, 
        loading, 
        error, 
        execute: fetchClientes 
    } = useClientes();
    
    const { 
        loading: creating, 
        error: createError, 
        execute: createCliente 
    } = useCreateCliente();

    useEffect(() => {
        fetchClientes(); // Carregar clientes
    }, [fetchClientes]);

    const handleCreate = async (clienteData) => {
        await createCliente(clienteData);
        fetchClientes(); // Recarregar lista
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div>
            {clientes?.map(cliente => (
                <div key={cliente.id}>{cliente.nome}</div>
            ))}
        </div>
    );
}
```

### 3. Usando os Serviços Diretamente

```typescript
import { clienteService } from '../services';

// Buscar todos os clientes
const response = await clienteService.getAll();
if (response.success) {
    console.log(response.data);
} else {
    console.error(response.error);
}

// Criar um cliente
const novoCliente = {
    nome: 'João Silva',
    nome_social: 'João',
    email: 'joao@email.com'
};

const createResponse = await clienteService.create(novoCliente);
if (createResponse.success) {
    console.log('Cliente criado:', createResponse.data);
}
```

### 4. Hooks Disponíveis

#### Clientes
- `useClientes()` - Listar todos os clientes
- `useCliente()` - Buscar cliente por ID
- `useCreateCliente()` - Criar cliente
- `useUpdateCliente()` - Atualizar cliente
- `useDeleteCliente()` - Excluir cliente

#### Pets
- `usePets()` - Listar todos os pets
- `usePet()` - Buscar pet por ID
- `usePetsByCliente()` - Listar pets de um cliente
- `useCreatePet()` - Criar pet
- `useUpdatePet()` - Atualizar pet
- `useDeletePet()` - Excluir pet

#### Serviços
- `useServicos()` - Listar todos os serviços
- `useServico()` - Buscar serviço por ID
- `useCreateServico()` - Criar serviço
- `useUpdateServico()` - Atualizar serviço
- `useDeleteServico()` - Excluir serviço

#### Produtos
- `useProdutos()` - Listar todos os produtos
- `useProduto()` - Buscar produto por ID
- `useCreateProduto()` - Criar produto
- `useUpdateProduto()` - Atualizar produto
- `useUpdateEstoque()` - Atualizar estoque
- `useDeleteProduto()` - Excluir produto

### 5. Utilitários

```typescript
import { 
    formatCurrency, 
    formatDate, 
    formatDateTime, 
    isValidEmail,
    formatCPF,
    formatPhone 
} from '../utils/apiUtils';

// Formatação de moeda
const preco = formatCurrency(29.99); // R$ 29,99

// Formatação de data
const data = formatDate(new Date()); // 01/01/2024

// Formatação de data e hora
const dataHora = formatDateTime(new Date()); // 01/01/2024 14:30

// Validação de email
const emailValido = isValidEmail('teste@email.com'); // true

// Formatação de CPF
const cpf = formatCPF('12345678901'); // 123.456.789-01

// Formatação de telefone
const telefone = formatPhone('11', '999999999'); // (11) 999999999
```

## Exemplos Práticos

### Exemplo 1: Lista de Clientes com CRUD

```typescript
import React, { useEffect, useState } from 'react';
import { useClientes, useCreateCliente, useUpdateCliente, useDeleteCliente } from '../hooks';
import { Cliente, CreateClienteRequest } from '../types/api';

function ClienteList() {
    const [formData, setFormData] = useState<CreateClienteRequest>({
        nome: '',
        email: ''
    });

    const { data: clientes, loading, error, execute: fetchClientes } = useClientes();
    const { execute: createCliente } = useCreateCliente();
    const { execute: updateCliente } = useUpdateCliente();
    const { execute: deleteCliente } = useDeleteCliente();

    useEffect(() => {
        fetchClientes();
    }, [fetchClientes]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createCliente(formData);
        setFormData({ nome: '', email: '' });
        fetchClientes();
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Nome"
                />
                <input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email"
                />
                <button type="submit">Criar Cliente</button>
            </form>

            <ul>
                {clientes?.map(cliente => (
                    <li key={cliente.id}>
                        {cliente.nome} - {cliente.email}
                        <button onClick={() => deleteCliente(cliente.id)}>
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

### Exemplo 2: Gerenciamento de Estoque

```typescript
import React from 'react';
import { useProdutos, useUpdateEstoque } from '../hooks';
import { formatCurrency } from '../utils/apiUtils';

function EstoqueManager() {
    const { data: produtos, loading, error, execute: fetchProdutos } = useProdutos();
    const { execute: updateEstoque } = useUpdateEstoque();

    const handleUpdateEstoque = async (produtoId: number, quantidade: number) => {
        await updateEstoque(produtoId, quantidade);
        fetchProdutos(); // Recarregar lista
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div>
            <h2>Gerenciamento de Estoque</h2>
            {produtos?.map(produto => (
                <div key={produto.id}>
                    <h3>{produto.nome}</h3>
                    <p>Preço: {formatCurrency(produto.preco)}</p>
                    <p>Estoque: {produto.estoque}</p>
                    <button onClick={() => handleUpdateEstoque(produto.id, 1)}>
                        +1
                    </button>
                    <button onClick={() => handleUpdateEstoque(produto.id, -1)}>
                        -1
                    </button>
                </div>
            ))}
        </div>
    );
}
```

## Tratamento de Erros

Todos os serviços retornam um objeto `ApiResponse` com a seguinte estrutura:

```typescript
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
```

Sempre verifique o campo `success` antes de usar os dados:

```typescript
const response = await clienteService.getAll();

if (response.success) {
    // Usar response.data
    console.log(response.data);
} else {
    // Tratar erro
    console.error(response.error);
}
```

## Configuração

O serviço base está configurado para usar a URL `http://localhost:3000/api`. Se precisar alterar a URL base, modifique o arquivo `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:3000/api'; // Altere conforme necessário
```

## Dicas

1. **Use os hooks**: Eles fornecem gerenciamento automático de estado de loading e erro
2. **Sempre trate erros**: Verifique o campo `success` nas respostas
3. **Use os utilitários**: Eles facilitam formatação e validação
4. **Recarregue dados**: Após operações de criação/atualização/exclusão, recarregue as listas
5. **TypeScript**: Use os tipos fornecidos para melhor experiência de desenvolvimento 