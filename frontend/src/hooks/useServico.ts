import { useApi } from './useApi';
import { servicoService } from '../services';
import { Servico } from '../types/api';

export function useServicos() {
    return useApi<Servico[]>(servicoService.getAll);
}

export function useServico() {
    return useApi<Servico>(servicoService.getById);
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