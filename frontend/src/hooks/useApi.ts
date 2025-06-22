import { useState, useCallback } from 'react';
import { ApiResponse } from '../types/api';

interface UseApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
    execute: (...args: any[]) => Promise<void>;
    reset: () => void;
}

export function useApi<T>(
    apiFunction: (...args: any[]) => Promise<ApiResponse<T>>
): UseApiReturn<T> {
    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const execute = useCallback(
        async (...args: any[]) => {
            setState(prev => ({ ...prev, loading: true, error: null }));
            
            try {
                const response = await apiFunction(...args);
                
                if (response.success) {
                    setState({
                        data: response.data || null,
                        loading: false,
                        error: null,
                    });
                } else {
                    setState({
                        data: null,
                        loading: false,
                        error: response.error || 'Erro desconhecido',
                    });
                }
            } catch (error) {
                setState({
                    data: null,
                    loading: false,
                    error: error instanceof Error ? error.message : 'Erro desconhecido',
                });
            }
        },
        [apiFunction]
    );

    const reset = useCallback(() => {
        setState({
            data: null,
            loading: false,
            error: null,
        });
    }, []);

    return {
        ...state,
        execute,
        reset,
    };
} 