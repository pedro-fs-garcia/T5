import { apiService } from './api';
import {
    DocumentoCliente,
    ApiResponse
} from '../types/api';

export interface CreateDocumentoRequest {
    cliente_id: number;
    tipo: 'CPF' | 'RG';
    valor: string;
    data_emissao?: Date;
}

export interface UpdateDocumentoRequest {
    tipo?: 'CPF' | 'RG';
    valor?: string;
    data_emissao?: Date;
}

export class DocumentoService {
    async create(documento: CreateDocumentoRequest): Promise<ApiResponse<DocumentoCliente>> {
        return apiService.post<DocumentoCliente>('/documentos', documento);
    }

    async getAll(): Promise<ApiResponse<DocumentoCliente[]>> {
        return apiService.get<DocumentoCliente[]>('/documentos');
    }

    async getById(id: number): Promise<ApiResponse<DocumentoCliente>> {
        return apiService.get<DocumentoCliente>(`/documentos/${id}`);
    }

    async update(id: number, documento: UpdateDocumentoRequest): Promise<ApiResponse<DocumentoCliente>> {
        return apiService.put<DocumentoCliente>(`/documentos/${id}`, documento);
    }

    async delete(id: number): Promise<ApiResponse<void>> {
        return apiService.delete<void>(`/documentos/${id}`);
    }
}

export const documentoService = new DocumentoService(); 