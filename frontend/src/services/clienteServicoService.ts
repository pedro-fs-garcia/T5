import { apiService } from './api';
import {
    ClienteServico,
    ApiResponse
} from '../types/api';

export interface CreateClienteServicoRequest {
    cliente_id: number;
    servico_id: number;
    data_realizacao: Date;
    valor_unitario: number;
    desconto?: number;
    observacoes?: string;
}

export interface UpdateClienteServicoRequest {
    data_realizacao?: Date;
    valor_unitario?: number;
    desconto?: number;
    observacoes?: string;
}

export class ClienteServicoService {
    async create(clienteServico: CreateClienteServicoRequest): Promise<ApiResponse<ClienteServico>> {
        return apiService.post<ClienteServico>('/cliente-servicos', clienteServico);
    }

    async getAll(): Promise<ApiResponse<ClienteServico[]>> {
        return apiService.get<ClienteServico[]>('/cliente-servicos');
    }

    async getById(id: number): Promise<ApiResponse<ClienteServico>> {
        return apiService.get<ClienteServico>(`/cliente-servicos/${id}`);
    }

    async getByClienteId(clienteId: number): Promise<ApiResponse<ClienteServico[]>> {
        return apiService.get<ClienteServico[]>(`/clientes/${clienteId}/servicos`);
    }

    async update(id: number, clienteServico: UpdateClienteServicoRequest): Promise<ApiResponse<ClienteServico>> {
        return apiService.put<ClienteServico>(`/cliente-servicos/${id}`, clienteServico);
    }

    async delete(id: number): Promise<ApiResponse<void>> {
        return apiService.delete<void>(`/cliente-servicos/${id}`);
    }
}

export const clienteServicoService = new ClienteServicoService(); 