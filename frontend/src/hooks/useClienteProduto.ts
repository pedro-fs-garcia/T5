import { useState, useCallback } from 'react';
import { clienteProdutoService } from '../services';
import { ClienteProduto } from '../types/api';
import React from 'react';

export function useClienteProdutos() {
    const [data, setData] = useState<ClienteProduto[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await clienteProdutoService.getAll();
            if (response.success) {
                setData(response.data || []);
            } else {
                setError(response.error || 'Erro desconhecido');
            }
        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, execute };
}

export function useClienteProduto() {
    const [data, setData] = useState<ClienteProduto | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await clienteProdutoService.getById(id);
            if (response.success) {
                setData(response.data || null);
            } else {
                setError(response.error || 'Erro desconhecido');
            }
        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, execute };
}

export function useClienteProdutoById(id: number) {
    const { data, loading, error, execute } = useClienteProduto();
    
    // Executar automaticamente quando o ID mudar
    React.useEffect(() => {
        if (id) {
            execute(id);
        }
    }, [id, execute]);
    
    return { data, loading, error, execute };
}

export function useClienteProdutosByCliente() {
    const [data, setData] = useState<ClienteProduto[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (clienteId: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await clienteProdutoService.getByClienteId(clienteId);
            if (response.success) {
                setData(response.data || []);
            } else {
                setError(response.error || 'Erro desconhecido');
            }
        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, execute };
}

export function useCreateClienteProduto() {
    const [data, setData] = useState<ClienteProduto | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (clienteProduto: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await clienteProdutoService.create(clienteProduto);
            if (response.success) {
                setData(response.data || null);
            } else {
                setError(response.error || 'Erro desconhecido');
            }
        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, execute };
}

export function useUpdateClienteProduto() {
    const [data, setData] = useState<ClienteProduto | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (id: number, updates: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await clienteProdutoService.update(id, updates);
            if (response.success) {
                setData(response.data || null);
            } else {
                setError(response.error || 'Erro desconhecido');
            }
        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, execute };
}

export function useDeleteClienteProduto() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await clienteProdutoService.delete(id);
            if (!response.success) {
                setError(response.error || 'Erro desconhecido');
            }
        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, execute };
} 