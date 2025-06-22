import { useApi } from './useApi';
import { petService } from '../services';
import { Pet } from '../types/api';

export function usePets() {
    return useApi<Pet[]>(petService.getAll);
}

export function usePet() {
    return useApi<Pet>(petService.getById);
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