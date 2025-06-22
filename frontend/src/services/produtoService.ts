import { apiService } from './api';
import {
    Produto,
    CreateProdutoRequest,
    UpdateProdutoRequest,
    ApiResponse
} from '../types/api';

export class ProdutoService {
    async create(produto: CreateProdutoRequest): Promise<ApiResponse<Produto>> {
        return apiService.post<Produto>('/produtos', produto);
    }

    async getAll(): Promise<ApiResponse<Produto[]>> {
        return apiService.get<Produto[]>('/produtos');
    }

    async getById(id: number): Promise<ApiResponse<Produto>> {
        return apiService.get<Produto>(`/produtos/${id}`);
    }

    async update(id: number, produto: UpdateProdutoRequest): Promise<ApiResponse<Produto>> {
        return apiService.put<Produto>(`/produtos/${id}`, produto);
    }

    async updateEstoque(id: number, quantidade: number): Promise<ApiResponse<Produto>> {
        return apiService.patch<Produto>(`/produtos/${id}/estoque`, { quantidade });
    }

    async delete(id: number): Promise<ApiResponse<void>> {
        return apiService.delete<void>(`/produtos/${id}`);
    }
}

export const produtoService = new ProdutoService(); 