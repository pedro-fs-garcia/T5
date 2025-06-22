import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePets, useDeletePet } from '../../hooks';

export default function PetList() {
    const [busca, setBusca] = useState('');
    const { data: pets, loading, error, execute: fetchPets } = usePets();
    const { execute: deletePet } = useDeletePet();

    useEffect(() => {
        fetchPets();
    }, [fetchPets]);

    const petsFiltrados = pets?.filter(pet => 
        pet.nome.toLowerCase().includes(busca.toLowerCase()) ||
        pet.raca.toLowerCase().includes(busca.toLowerCase()) ||
        pet.tipo.toLowerCase().includes(busca.toLowerCase())
    ) || [];

    const handleDelete = async (id: number) => {
        const confirmacao = window.confirm("Tem certeza que deseja excluir este pet?");
        if (!confirmacao) return;

        await deletePet(id);
        fetchPets(); // Recarregar lista após exclusão
    };

    if (loading) {
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

    if (error) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger">
                    Erro ao carregar pets: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Pets</h2>
                <Link to="/pets/novo" className="btn btn-success">
                    <i className="bi bi-plus-circle me-2"></i>
                    Novo Pet
                </Link>
            </div>

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por nome, raça ou tipo..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {petsFiltrados.map((pet) => (
                    <div key={pet.id} className="col">
                        <div className="card h-100 shadow-sm">
                            <div className="card-header bg-success text-white">
                                <h5 className="card-title mb-0">{pet.nome}</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    <strong>Raça:</strong> {pet.raca}
                                </p>
                                <p className="card-text">
                                    <strong>Tipo:</strong> {pet.tipo}
                                </p>
                                <p className="card-text">
                                    <strong>Gênero:</strong> {pet.genero === 'M' ? 'Macho' : 'Fêmea'}
                                </p>
                                <p className="card-text">
                                    <strong>ID do Cliente:</strong> {pet.cliente_id}
                                </p>
                            </div>
                            <div className="card-footer bg-transparent">
                                <Link
                                    to={`/pets/${pet.id}`}
                                    className="btn btn-outline-primary w-100 mb-2"
                                >
                                    <i className="bi bi-eye me-2"></i>
                                    Ver Detalhes
                                </Link>
                                <button
                                    onClick={() => handleDelete(pet.id)}
                                    className="btn btn-outline-danger w-100"
                                >
                                    <i className="bi bi-trash me-2"></i>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {petsFiltrados.length === 0 && (
                <div className="alert alert-info" role="alert">
                    Nenhum pet encontrado com os critérios de busca.
                </div>
            )}
        </div>
    );
} 