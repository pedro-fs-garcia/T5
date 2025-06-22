import { apiService } from './api';
import {
    Cliente,
    ClienteCompleto,
    CreateClienteRequest,
    UpdateClienteRequest,
    ApiResponse
} from '../types/api';

export class ClienteService {
    async create(cliente: CreateClienteRequest): Promise<ApiResponse<Cliente>> {
        return apiService.post<Cliente>('/clientes', cliente);
    }

    async getAll(): Promise<ApiResponse<Cliente[]>> {
        return apiService.get<Cliente[]>('/clientes');
    }

    async getById(id: number): Promise<ApiResponse<ClienteCompleto>> {
        return apiService.get<ClienteCompleto>(`/clientes/${id}`);
    }

    async update(id: number, cliente: UpdateClienteRequest): Promise<ApiResponse<Cliente>> {
        return apiService.put<Cliente>(`/clientes/${id}`, cliente);
    }

    async delete(id: number): Promise<ApiResponse<void>> {
        return apiService.delete<void>(`/clientes/${id}`);
    }
}

export const clienteService = new ClienteService(); 