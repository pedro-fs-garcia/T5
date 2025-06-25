import { apiService } from './api';
import {
    Endereco,
    ApiResponse
} from '../types/api';

export interface CreateEnderecoRequest {
    cliente_id: number;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    complemento?: string;
    cep: string;
}

export interface UpdateEnderecoRequest {
    estado?: string;
    cidade?: string;
    bairro?: string;
    rua?: string;
    numero?: string;
    complemento?: string;
    cep?: string;
}

export class EnderecoService {
    async create(endereco: CreateEnderecoRequest): Promise<ApiResponse<Endereco>> {
        return apiService.post<Endereco>('/enderecos', endereco);
    }

    async getAll(): Promise<ApiResponse<Endereco[]>> {
        return apiService.get<Endereco[]>('/enderecos');
    }

    async getById(id: number): Promise<ApiResponse<Endereco>> {
        return apiService.get<Endereco>(`/enderecos/${id}`);
    }

    async update(id: number, endereco: UpdateEnderecoRequest): Promise<ApiResponse<Endereco>> {
        return apiService.put<Endereco>(`/enderecos/${id}`, endereco);
    }

    async delete(id: number): Promise<ApiResponse<void>> {
        return apiService.delete<void>(`/enderecos/${id}`);
    }
}

export const enderecoService = new EnderecoService(); 