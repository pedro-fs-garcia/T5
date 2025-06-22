import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCliente, useUpdateCliente } from '../../hooks';
import { UpdateClienteRequest } from '../../types/api';
import { formatDate, formatPhone } from '../../utils/apiUtils';

export default function ClienteDetalhes() {
    const { id } = useParams<{ id: string }>();
    const [editando, setEditando] = useState(false);
    const [formData, setFormData] = useState<UpdateClienteRequest>({
        nome: '',
        nome_social: '',
        email: ''
    });

    const { data: cliente, loading, error, execute: fetchCliente } = useCliente();
    const { loading: updating, error: updateError, execute: updateCliente } = useUpdateCliente();

    useEffect(() => {
        if (id) {
            fetchCliente(Number(id));
        }
    }, [id, fetchCliente]);

    useEffect(() => {
        if (cliente) {
            setFormData({
                nome: cliente.nome,
                nome_social: cliente.nome_social || '',
                email: cliente.email
            });
        }
    }, [cliente]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            await updateCliente(Number(id), formData);
            setEditando(false);
            fetchCliente(Number(id)); // Recarregar dados
        }
    };

    const renderInput = (
        label: string,
        name: string,
        value: string,
        type: 'text' | 'email' = 'text'
    ) => (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label text-secondary fw-semibold mb-0">{label}</label>
                {!editando && (
                    <span className="badge bg-light text-secondary">Visualização</span>
                )}
            </div>

            {editando ? (
                <input
                    type={type}
                    className="form-control shadow-sm rounded-3"
                    name={name}
                    value={value}
                    onChange={handleChange}
                />
            ) : (
                <div className="form-control-plaintext border p-2 rounded bg-light text-black">
                    {value?.trim() ? value : 'Não informado'}
                </div>
            )}
        </div>
    );

    if (loading) {
        return (
            <div className="container py-4 text-center">
                <div className="spinner-border" role="status" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger">Erro ao carregar cliente: {error}</div>
                <Link to="/clientes" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Voltar para Clientes
                </Link>
            </div>
        );
    }

    if (!cliente) {
        return (
            <div className="container py-4">
                <div className="alert alert-warning">Cliente não encontrado</div>
                <Link to="/clientes" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Voltar para Clientes
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Detalhes do Cliente</h2>
                <div>
                    <Link to="/clientes" className="btn btn-outline-secondary me-2">
                        <i className="bi bi-arrow-left me-2"></i> Voltar
                    </Link>
                    {editando ? (
                        <button 
                            className="btn btn-primary" 
                            onClick={handleSubmit}
                            disabled={updating}
                        >
                            <i className="bi bi-check me-2" /> 
                            {updating ? 'Salvando...' : 'Salvar'}
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={() => setEditando(true)}>
                            <i className="bi bi-pencil me-2" /> Editar
                        </button>
                    )}
                </div>
            </div>

            {updateError && (
                <div className="alert alert-danger mb-4">
                    Erro ao atualizar cliente: {updateError}
                </div>
            )}

            <div className="card shadow-sm mb-4">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações do Cliente</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {renderInput('Nome', 'nome', formData.nome || '')}
                        {renderInput('Nome Social', 'nome_social', formData.nome_social || '')}
                        {renderInput('E-mail', 'email', formData.email || '', 'email')}
                        <div className="mb-4">
                            <label className="form-label text-secondary fw-semibold mb-0">Data de Cadastro</label>
                            <div className="form-control-plaintext border p-2 rounded bg-light text-black">
                                {formatDate(cliente.data_cadastro)}
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Telefones */}
            {cliente.telefones && cliente.telefones.length > 0 && (
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-info text-white">
                        <h5 className="mb-0">Telefones</h5>
                    </div>
                    <div className="card-body">
                        {cliente.telefones.map((telefone) => (
                            <div key={telefone.id} className="mb-2">
                                <strong>Telefone:</strong> {formatPhone(telefone.ddd, telefone.numero)}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Endereços */}
            {cliente.enderecos && cliente.enderecos.length > 0 && (
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-warning text-dark">
                        <h5 className="mb-0">Endereços</h5>
                    </div>
                    <div className="card-body">
                        {cliente.enderecos.map((endereco) => (
                            <div key={endereco.id} className="mb-3">
                                <p className="mb-1">
                                    <strong>Endereço:</strong> {endereco.rua}, {endereco.numero}
                                </p>
                                <p className="mb-1">
                                    <strong>Bairro:</strong> {endereco.bairro}
                                </p>
                                <p className="mb-1">
                                    <strong>Cidade:</strong> {endereco.cidade} - {endereco.estado}
                                </p>
                                <p className="mb-1">
                                    <strong>CEP:</strong> {endereco.cep}
                                </p>
                                {endereco.complemento && (
                                    <p className="mb-1">
                                        <strong>Complemento:</strong> {endereco.complemento}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Pets */}
            {cliente.pets && cliente.pets.length > 0 && (
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Pets</h5>
                    </div>
                    <div className="card-body">
                        {cliente.pets.map((pet) => (
                            <div key={pet.id} className="mb-2">
                                <strong>{pet.nome}</strong> - {pet.raca} ({pet.tipo}, {pet.genero === 'M' ? 'Macho' : 'Fêmea'})
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
