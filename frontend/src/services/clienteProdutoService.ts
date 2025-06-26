import { apiService } from './api';
import {
    ClienteProduto,
    ApiResponse
} from '../types/api';

export interface CreateClienteProdutoRequest {
    cliente_id: number;
    produto_id: number;
    quantidade: number;
    data_compra: Date;
    valor_unitario: number;
    desconto?: number;
}

export interface UpdateClienteProdutoRequest {
    quantidade?: number;
    data_compra?: Date;
    valor_unitario?: number;
    desconto?: number;
}

export class ClienteProdutoService {
    async create(clienteProduto: CreateClienteProdutoRequest): Promise<ApiResponse<ClienteProduto>> {
        return apiService.post<ClienteProduto>('/cliente-produtos', clienteProduto);
    }

    async getAll(): Promise<ApiResponse<ClienteProduto[]>> {
        return apiService.get<ClienteProduto[]>('/cliente-produtos');
    }

    async getById(id: number): Promise<ApiResponse<ClienteProduto>> {
        return apiService.get<ClienteProduto>(`/cliente-produtos/${id}`);
    }

    async getByClienteId(clienteId: number): Promise<ApiResponse<ClienteProduto[]>> {
        return apiService.get<ClienteProduto[]>(`/clientes/${clienteId}/produtos`);
    }

    async update(id: number, clienteProduto: UpdateClienteProdutoRequest): Promise<ApiResponse<ClienteProduto>> {
        return apiService.put<ClienteProduto>(`/cliente-produtos/${id}`, clienteProduto);
    }

    async delete(id: number): Promise<ApiResponse<void>> {
        return apiService.delete<void>(`/cliente-produtos/${id}`);
    }
}

export const clienteProdutoService = new ClienteProdutoService(); 