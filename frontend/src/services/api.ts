import { ApiResponse } from '../types/api';

const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${API_BASE_URL}${endpoint}`;
        
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        const config: RequestInit = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: data.error || `HTTP error! status: ${response.status}`,
                };
            }

            return data;
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Erro desconhecido',
            };
        }
    }

    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'GET',
        });
    }

    async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
        });
    }
}

export const apiService = new ApiService(); 