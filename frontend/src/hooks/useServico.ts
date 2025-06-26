import { useApi } from './useApi';
import { servicoService } from '../services';
import { Servico } from '../types/api';
import React from 'react';

export function useServicos() {
    return useApi<Servico[]>(servicoService.getAll);
}

export function useServico() {
    return useApi<Servico>(servicoService.getById);
}

export function useServicoById(id: number) {
    const { data, loading, error, execute } = useApi<Servico>(servicoService.getById);
    
    // Executar automaticamente quando o ID mudar
    React.useEffect(() => {
        if (id) {
            execute(id);
        }
    }, [id, execute]);
    
    return { data, loading, error, execute };
}

export function useCreateServico() {
    return useApi<Servico>(servicoService.create);
}

export function useUpdateServico() {
    return useApi<Servico>(servicoService.update);
}

export function useDeleteServico() {
    return useApi<void>(servicoService.delete);
} 