import { useApi } from './useApi';
import { produtoService } from '../services';
import { Produto } from '../types/api';
import React from 'react';

export function useProdutos() {
    return useApi<Produto[]>(produtoService.getAll);
}

export function useProduto() {
    return useApi<Produto>(produtoService.getById);
}

export function useProdutoById(id: number) {
    const { data, loading, error, execute } = useApi<Produto>(produtoService.getById);
    
    // Executar automaticamente quando o ID mudar
    React.useEffect(() => {
        if (id) {
            execute(id);
        }
    }, [id, execute]);
    
    return { data, loading, error, execute };
}

export function useCreateProduto() {
    return useApi<Produto>(produtoService.create);
}

export function useUpdateProduto() {
    return useApi<Produto>(produtoService.update);
}

export function useUpdateEstoque() {
    return useApi<Produto>(produtoService.updateEstoque);
}

export function useDeleteProduto() {
    return useApi<void>(produtoService.delete);
} 