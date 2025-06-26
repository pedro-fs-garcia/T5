import { useState, useCallback } from 'react';
import { clienteServicoService } from '../services';
import { ClienteServico } from '../types/api';
import React from 'react';

export function useClienteServicos() {
    const [data, setData] = useState<ClienteServico[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await clienteServicoService.getAll();
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

export function useClienteServico() {
    const [data, setData] = useState<ClienteServico | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await clienteServicoService.getById(id);
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

export function useClienteServicoById(id: number) {
    const { data, loading, error, execute } = useClienteServico();
    
    // Executar automaticamente quando o ID mudar
    React.useEffect(() => {
        if (id) {
            execute(id);
        }
    }, [id, execute]);
    
    return { data, loading, error, execute };
}

export function useClienteServicosByCliente() {
    const [data, setData] = useState<ClienteServico[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (clienteId: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await clienteServicoService.getByClienteId(clienteId);
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

export function useCreateClienteServico() {
    const [data, setData] = useState<ClienteServico | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (clienteServico: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await clienteServicoService.create(clienteServico);
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

export function useUpdateClienteServico() {
    const [data, setData] = useState<ClienteServico | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (id: number, updates: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await clienteServicoService.update(id, updates);
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

export function useDeleteClienteServico() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await clienteServicoService.delete(id);
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