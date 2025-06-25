import { apiService } from './api';
import {
    Telefone,
    ApiResponse
} from '../types/api';

export interface CreateTelefoneRequest {
    cliente_id: number;
    ddd: string;
    numero: string;
}

export interface UpdateTelefoneRequest {
    ddd?: string;
    numero?: string;
}

export class TelefoneService {
    async create(telefone: CreateTelefoneRequest): Promise<ApiResponse<Telefone>> {
        return apiService.post<Telefone>('/telefones', telefone);
    }

    async getAll(): Promise<ApiResponse<Telefone[]>> {
        return apiService.get<Telefone[]>('/telefones');
    }

    async getById(id: number): Promise<ApiResponse<Telefone>> {
        return apiService.get<Telefone>(`/telefones/${id}`);
    }

    async update(id: number, telefone: UpdateTelefoneRequest): Promise<ApiResponse<Telefone>> {
        return apiService.put<Telefone>(`/telefones/${id}`, telefone);
    }

    async delete(id: number): Promise<ApiResponse<void>> {
        return apiService.delete<void>(`/telefones/${id}`);
    }
}

export const telefoneService = new TelefoneService(); 