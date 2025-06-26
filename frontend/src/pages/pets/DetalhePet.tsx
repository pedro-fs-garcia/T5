import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePetById, useUpdatePet } from '../../hooks';
import { UpdatePetRequest } from '../../types/api';

interface PetFormData {
    nome: string;
    raca: string;
    genero: "M" | "F";
    tipo: string;
}

export default function DetalhePet() {
    const { id } = useParams<{ id: string }>();
    const { data: pet, loading, error, execute: fetchPet } = usePetById(id ? parseInt(id) : 0);
    const { execute: updatePet, loading: loadingUpdate, error: errorUpdate } = useUpdatePet();
    
    const [editando, setEditando] = useState(false);
    const [formData, setFormData] = useState<PetFormData>({
        nome: '',
        raca: '',
        genero: 'M',
        tipo: ''
    });
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        if (pet) {
            setFormData({
                nome: pet.nome,
                raca: pet.raca,
                genero: pet.genero,
                tipo: pet.tipo
            });
        }
    }, [pet]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!pet || !id) return;

        // Validações básicas
        if (!formData.nome.trim()) {
            setMensagem('O nome do pet é obrigatório');
            return;
        }
        if (!formData.raca.trim()) {
            setMensagem('A raça do pet é obrigatória');
            return;
        }
        if (!formData.tipo.trim()) {
            setMensagem('O tipo do pet é obrigatório');
            return;
        }

        const petData: UpdatePetRequest = {
            nome: formData.nome.trim(),
            raca: formData.raca.trim(),
            genero: formData.genero,
            tipo: formData.tipo.trim()
        };

        await updatePet(parseInt(id), petData);
        
        // Se não houve erro, sair do modo de edição
        if (!errorUpdate) {
            setEditando(false);
            setMensagem('Pet atualizado com sucesso!');
            // Recarregar dados do pet
            fetchPet(parseInt(id));
        }
    };

    const handleCancel = () => {
        if (pet) {
            setFormData({
                nome: pet.nome,
                raca: pet.raca,
                genero: pet.genero,
                tipo: pet.tipo
            });
        }
        setEditando(false);
        setMensagem('');
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
                    Erro ao carregar pet: {error}
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

    const renderField = (
        label: string,
        name: keyof PetFormData,
        type: 'text' | 'select' = 'text',
        options?: { value: string; label: string }[]
    ) => (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            {editando ? (
                type === 'select' ? (
                    <select
                        className="form-select"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        required
                    >
                        {options?.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={type}
                        className="form-control"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        required
                    />
                )
            ) : (
                <p className="form-control-plaintext">
                    {name === 'genero' 
                        ? (formData[name] === 'M' ? 'Macho' : 'Fêmea')
                        : formData[name] || ''}
                </p>
            )}
        </div>
    );

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Detalhes do Pet</h2>
                <div>
                    <Link to="/pets" className="btn btn-outline-secondary me-2">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar
                    </Link>
                    {!editando ? (
                        <button
                            className="btn btn-primary"
                            onClick={() => setEditando(true)}
                        >
                            <i className="bi bi-pencil me-2"></i>
                            Editar
                        </button>
                    ) : (
                        <div>
                            <button
                                className="btn btn-outline-secondary me-2"
                                onClick={handleCancel}
                            >
                                <i className="bi bi-x me-2"></i>
                                Cancelar
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={handleSubmit}
                                disabled={loadingUpdate}
                            >
                                {loadingUpdate ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check me-2"></i>
                                        Salvar
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {mensagem && (
                <div className="alert alert-success" role="alert">
                    {mensagem}
                </div>
            )}

            {errorUpdate && (
                <div className="alert alert-danger" role="alert">
                    Erro ao atualizar pet: {errorUpdate}
                </div>
            )}

            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações do Pet</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {renderField('Nome', 'nome')}
                        {renderField('Tipo', 'tipo')}
                        {renderField('Raça', 'raca')}
                        {renderField('Gênero', 'genero', 'select', [
                            { value: 'M', label: 'Macho' },
                            { value: 'F', label: 'Fêmea' }
                        ])}
                        
                        <div className="mb-3">
                            <label className="form-label">ID do Cliente</label>
                            <p className="form-control-plaintext">{pet.cliente_id}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 