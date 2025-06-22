import { apiService } from './api';
import {
    Pet,
    CreatePetRequest,
    UpdatePetRequest,
    ApiResponse
} from '../types/api';

export class PetService {
    async create(pet: CreatePetRequest): Promise<ApiResponse<Pet>> {
        return apiService.post<Pet>('/pets', pet);
    }

    async getAll(): Promise<ApiResponse<Pet[]>> {
        return apiService.get<Pet[]>('/pets');
    }

    async getById(id: number): Promise<ApiResponse<Pet>> {
        return apiService.get<Pet>(`/pets/${id}`);
    }

    async getByClienteId(clienteId: number): Promise<ApiResponse<Pet[]>> {
        return apiService.get<Pet[]>(`/clientes/${clienteId}/pets`);
    }

    async update(id: number, pet: UpdatePetRequest): Promise<ApiResponse<Pet>> {
        return apiService.put<Pet>(`/pets/${id}`, pet);
    }

    async delete(id: number): Promise<ApiResponse<void>> {
        return apiService.delete<void>(`/pets/${id}`);
    }
}

export const petService = new PetService(); 