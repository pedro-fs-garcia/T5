import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClientes, useCreatePet } from '../../hooks';
import { CreatePetRequest } from '../../types/api';

interface PetData {
    nome: string;
    raca: string;
    genero: "M" | "F";
    tipo: string;
    cliente_id: number;
}

export default function PetForm() {
    const navigate = useNavigate();
    const { data: clientes, loading: loadingClientes, error: errorClientes, execute: fetchClientes } = useClientes();
    const { execute: createPet, loading: loadingCreate, error: errorCreate } = useCreatePet();
    
    const [pet, setPet] = useState<PetData>({
        nome: '',
        raca: '',
        genero: 'M',
        tipo: '',
        cliente_id: 0
    });
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        fetchClientes();
    }, [fetchClientes]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPet(prev => ({
            ...prev,
            [name]: name === 'cliente_id' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validações básicas
        if (!pet.nome.trim()) {
            setMensagem('O nome do pet é obrigatório');
            return;
        }
        if (!pet.raca.trim()) {
            setMensagem('A raça do pet é obrigatória');
            return;
        }
        if (!pet.tipo.trim()) {
            setMensagem('O tipo do pet é obrigatório');
            return;
        }
        if (!pet.cliente_id) {
            setMensagem('O dono do pet é obrigatório');
            return;
        }

        const petData: CreatePetRequest = {
            nome: pet.nome.trim(),
            raca: pet.raca.trim(),
            genero: pet.genero,
            tipo: pet.tipo.trim(),
            cliente_id: pet.cliente_id
        };

        await createPet(petData);
        
        // Se não houve erro, redirecionar para a lista
        if (!errorCreate) {
            navigate('/pets');
        }
    };

    if (loadingClientes) {
        return (
            <div className="container py-4">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (errorClientes) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger">
                    Erro ao carregar clientes: {errorClientes}
                </div>
                <Link to="/pets" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Registrar Novo Pet</h2>
                <Link to="/pets" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar
                </Link>
            </div>

            {mensagem && (
                <div className="alert alert-warning" role="alert">
                    {mensagem}
                </div>
            )}

            {errorCreate && (
                <div className="alert alert-danger" role="alert">
                    Erro ao criar pet: {errorCreate}
                </div>
            )}

            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações do Pet</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nome do Pet</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nome"
                                value={pet.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Tipo</label>
                            <select
                                className="form-select"
                                name="tipo"
                                value={pet.tipo}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione o tipo</option>
                                <option value="Cachorro">Cachorro</option>
                                <option value="Gato">Gato</option>
                                <option value="Ave">Ave</option>
                                <option value="Peixe">Peixe</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Raça</label>
                            <input
                                type="text"
                                className="form-control"
                                name="raca"
                                value={pet.raca}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Gênero</label>
                            <select
                                className="form-select"
                                name="genero"
                                value={pet.genero}
                                onChange={handleChange}
                                required
                            >
                                <option value="M">Macho</option>
                                <option value="F">Fêmea</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Dono</label>
                            <select
                                className="form-select"
                                name="cliente_id"
                                value={pet.cliente_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione o dono</option>
                                {clientes?.map(cliente => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="d-grid">
                            <button 
                                type="submit" 
                                className="btn btn-success"
                                disabled={loadingCreate}
                            >
                                {loadingCreate ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-save me-2"></i>
                                        Registrar Pet
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 