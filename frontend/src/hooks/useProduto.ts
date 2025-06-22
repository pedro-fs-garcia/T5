import { useApi } from './useApi';
import { produtoService } from '../services';
import { Produto } from '../types/api';

export function useProdutos() {
    return useApi<Produto[]>(produtoService.getAll);
}

export function useProduto() {
    return useApi<Produto>(produtoService.getById);
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