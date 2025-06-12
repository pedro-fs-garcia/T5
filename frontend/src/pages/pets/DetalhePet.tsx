import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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

export default function DetalhePet() {
    const { id } = useParams<{ id: string }>();
    const [pet, setPet] = useState<PetData | null>(null);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        fetch('/pets.json')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar os dados do pet');
                return res.json();
            })
            .then((data: PetData[]) => {
                const petEncontrado = data.find(p => p.id === Number(id));
                if (petEncontrado) {
                    setPet(petEncontrado);
                } else {
                    setMensagem('Pet não encontrado');
                }
            })
            .catch((err) => setMensagem(`Erro: ${err.message}`))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!pet) return;
        
        const { name, value } = e.target;
        setPet(prev => {
            if (!prev) return null;
            return {
                ...prev,
                [name]: name === 'idade' || name === 'peso' ? parseFloat(value) : value
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você implementaria a lógica para salvar as alterações
        setMensagem('Alterações salvas com sucesso!');
        setEditando(false);
    };

    const renderField = (
        label: string,
        name: keyof PetData,
        type: 'text' | 'number' | 'textarea' = 'text'
    ) => (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            {editando ? (
                type === 'textarea' ? (
                    <textarea
                        className="form-control"
                        name={name}
                        value={pet?.[name] || ''}
                        onChange={handleChange}
                        rows={3}
                    />
                ) : (
                    <input
                        type={type}
                        className="form-control"
                        name={name}
                        value={pet?.[name] || ''}
                        onChange={handleChange}
                    />
                )
            ) : (
                <p className="form-control-plaintext">
                    {name === 'peso' 
                        ? `${pet?.[name]} kg`
                        : name === 'idade'
                        ? `${pet?.[name]} anos`
                        : pet?.[name] || ''}
                </p>
            )}
        </div>
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

    if (mensagem) {
        return (
            <div className="container py-4">
                <div className="alert alert-success" role="alert">
                    {mensagem}
                </div>
                <Link to="/pets" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar para Pets
                </Link>
            </div>
        );
    }

    if (!pet) {
        return (
            <div className="container py-4">
                <div className="alert alert-warning" role="alert">
                    Pet não encontrado
                </div>
                <Link to="/pets" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar para Pets
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Detalhes do Pet</h2>
                <div>
                    <Link to="/pets" className="btn btn-outline-secondary me-2">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar
                    </Link>
                    <button
                        className="btn btn-primary"
                        onClick={() => setEditando(!editando)}
                    >
                        <i className={`bi bi-${editando ? 'check' : 'pencil'} me-2`}></i>
                        {editando ? 'Salvar' : 'Editar'}
                    </button>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações do Pet</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {renderField('Nome', 'nome')}
                        {renderField('Espécie', 'especie')}
                        {renderField('Raça', 'raca')}
                        {renderField('Idade', 'idade', 'number')}
                        {renderField('Peso', 'peso', 'number')}
                        {renderField('Dono', 'clienteNome')}
                        {renderField('Observações', 'observacoes', 'textarea')}
                    </form>
                </div>
            </div>
        </div>
    );
} 