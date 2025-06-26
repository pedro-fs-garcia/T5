import { useApi } from './useApi';
import { petService } from '../services';
import { Pet } from '../types/api';
import React from 'react';

export function usePets() {
    return useApi<Pet[]>(petService.getAll);
}

export function usePet() {
    return useApi<Pet>(petService.getById);
}

export function usePetById(id: number) {
    const { data, loading, error, execute } = useApi<Pet>(petService.getById);
    
    // Executar automaticamente quando o ID mudar
    React.useEffect(() => {
        if (id) {
            execute(id);
        }
    }, [id, execute]);
    
    return { data, loading, error, execute };
}

export function usePetsByCliente() {
    return useApi<Pet[]>(petService.getByClienteId);
}

export function useCreatePet() {
    return useApi<Pet>(petService.create);
}

export function useUpdatePet() {
    return useApi<Pet>(petService.update);
}

export function useDeletePet() {
    return useApi<void>(petService.delete);
} 