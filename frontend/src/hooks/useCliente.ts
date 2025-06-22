import { useApi } from './useApi';
import { clienteService } from '../services';
import { Cliente, ClienteCompleto } from '../types/api';

export function useClientes() {
    return useApi<Cliente[]>(clienteService.getAll);
}

export function useCliente() {
    return useApi<ClienteCompleto>(clienteService.getById);
}

export function useCreateCliente() {
    return useApi<Cliente>(clienteService.create);
}

export function useUpdateCliente() {
    return useApi<Cliente>(clienteService.update);
}

export function useDeleteCliente() {
    return useApi<void>(clienteService.delete);
} 