import { ApiResponse } from '../types/api';

/**
 * Utility function to handle API responses
 */
export function handleApiResponse<T>(response: ApiResponse<T>): T {
    if (!response.success) {
        throw new Error(response.error || 'Erro desconhecido');
    }
    
    if (!response.data) {
        throw new Error('Dados não encontrados');
    }
    
    return response.data;
}

/**
 * Utility function to format currency values
 */
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

/**
 * Utility function to format dates
 */
export function formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('pt-BR').format(dateObj);
}

/**
 * Utility function to format datetime
 */
export function formatDateTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(dateObj);
}

/**
 * Utility function to validate email
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Utility function to validate CPF
 */
export function isValidCPF(cpf: string): boolean {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf);
}

/**
 * Utility function to format CPF
 */
export function formatCPF(cpf: string): string {
    const cleaned = cpf.replace(/\D/g, '');
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Utility function to format phone number
 */
export function formatPhone(ddd: string, numero: string): string {
    return `(${ddd}) ${numero}`;
} 