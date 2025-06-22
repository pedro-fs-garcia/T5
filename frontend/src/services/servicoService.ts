import { apiService } from './api';
import {
    Servico,
    CreateServicoRequest,
    UpdateServicoRequest,
    ApiResponse
} from '../types/api';

export class ServicoService {
    async create(servico: CreateServicoRequest): Promise<ApiResponse<Servico>> {
        return apiService.post<Servico>('/servicos', servico);
    }

    async getAll(): Promise<ApiResponse<Servico[]>> {
        return apiService.get<Servico[]>('/servicos');
    }

    async getById(id: number): Promise<ApiResponse<Servico>> {
        return apiService.get<Servico>(`/servicos/${id}`);
    }

    async update(id: number, servico: UpdateServicoRequest): Promise<ApiResponse<Servico>> {
        return apiService.put<Servico>(`/servicos/${id}`, servico);
    }

    async delete(id: number): Promise<ApiResponse<void>> {
        return apiService.delete<void>(`/servicos/${id}`);
    }
}

export const servicoService = new ServicoService(); 