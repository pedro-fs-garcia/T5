import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface PetData {
    id: number;
    nome: string;
    especie: string;
    raca: string;
    idade: number;
    peso: number;
    clienteId: number;
    clienteNome: string;
    observacoes: string;
}

export default function PetList() {
    const [pets, setPets] = useState<PetData[]>([]);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [busca, setBusca] = useState('');

    useEffect(() => {
        fetch('/pets.json')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar os dados dos pets');
                return res.json();
            })
            .then((data: PetData[]) => setPets(data))
            .catch((err) => setMensagem(`Erro: ${err.message}`))
            .finally(() => setLoading(false));
    }, []);

    const petsFiltrados = pets.filter(pet => 
        pet.nome.toLowerCase().includes(busca.toLowerCase()) ||
        pet.especie.toLowerCase().includes(busca.toLowerCase()) ||
        pet.raca.toLowerCase().includes(busca.toLowerCase()) ||
        pet.clienteNome.toLowerCase().includes(busca.toLowerCase())
    );

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

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Pets</h2>
                <Link to="/pets/novo" className="btn btn-success">
                    <i className="bi bi-plus-circle me-2"></i>
                    Novo Pet
                </Link>
            </div>

            {mensagem && (
                <div className="alert alert-warning" role="alert">
                    {mensagem}
                </div>
            )}

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por nome, espécie, raça ou dono..."
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
                                    <strong>Espécie:</strong> {pet.especie}
                                </p>
                                <p className="card-text">
                                    <strong>Raça:</strong> {pet.raca}
                                </p>
                                <p className="card-text">
                                    <strong>Idade:</strong> {pet.idade} anos
                                </p>
                                <p className="card-text">
                                    <strong>Peso:</strong> {pet.peso} kg
                                </p>
                                <p className="card-text">
                                    <strong>Dono:</strong> {pet.clienteNome}
                                </p>
                                {pet.observacoes && (
                                    <p className="card-text">
                                        <strong>Observações:</strong> {pet.observacoes}
                                    </p>
                                )}
                            </div>
                            <div className="card-footer bg-transparent">
                                <Link
                                    to={`/pets/${pet.id}`}
                                    className="btn btn-outline-primary w-100"
                                >
                                    <i className="bi bi-eye me-2"></i>
                                    Ver Detalhes
                                </Link>
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