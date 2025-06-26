// API Response wrapper
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Cliente interfaces
export interface Cliente {
    id: number;
    nome: string;
    nome_social?: string;
    data_cadastro: Date;
    email: string;
}

export interface DocumentoCliente {
    id: number;
    cliente_id: number;
    tipo: 'CPF' | 'RG';
    valor: string;
    data_emissao?: Date;
}

export interface Telefone {
    id: number;
    cliente_id: number;
    ddd: string;
    numero: string;
}

export interface Endereco {
    id: number;
    cliente_id: number;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    complemento?: string;
    cep: string;
}

export interface ClienteCompleto extends Cliente {
    documentos: DocumentoCliente[];
    telefones: Telefone[];
    enderecos: Endereco[];
    pets: Pet[];
}

// Pet interfaces
export interface Pet {
    id: number;
    cliente_id: number;
    nome: string;
    raca: string;
    genero: "M" | "F";
    tipo: string;
}

// Serviço interfaces
export interface Servico {
    id: number;
    nome: string;
    descricao?: string;
    preco: number;
    duracao_minutos: number;
}

// Produto interfaces
export interface Produto {
    id: number;
    nome: string;
    descricao?: string;
    preco: number;
    estoque: number;
}

// Relacionamentos
export interface ClienteServico {
    id: number;
    cliente_id: number;
    servico_id: number;
    data_realizacao: Date;
    valor_unitario: number;
    desconto: number;
    valor_total: number;
    observacoes?: string;
    cliente_nome?: string;
    servico_nome?: string;
}

export interface ClienteProduto {
    id: number;
    cliente_id: number;
    produto_id: number;
    quantidade: number;
    data_compra: Date;
    valor_unitario: number;
    desconto: number;
    valor_total: number;
    cliente_nome?: string;
    produto_nome?: string;
}

// Request types
export interface CreateClienteRequest {
    nome: string;
    nome_social?: string;
    email: string;
}

export interface UpdateClienteRequest {
    nome?: string;
    nome_social?: string;
    email?: string;
}

export interface CreatePetRequest {
    cliente_id: number;
    nome: string;
    raca: string;
    genero: "M" | "F";
    tipo: string;
}

export interface UpdatePetRequest {
    nome?: string;
    raca?: string;
    genero?: "M" | "F";
    tipo?: string;
}

export interface CreateServicoRequest {
    nome: string;
    descricao?: string;
    preco: number;
    duracao_minutos: number;
}

export interface UpdateServicoRequest {
    nome?: string;
    descricao?: string;
    preco?: number;
    duracao_minutos?: number;
}

export interface CreateProdutoRequest {
    nome: string;
    descricao?: string;
    preco: number;
    estoque: number;
}

export interface UpdateProdutoRequest {
    nome?: string;
    descricao?: string;
    preco?: number;
    estoque?: number;
}

export interface UpdateEstoqueRequest {
    quantidade: number;
} 