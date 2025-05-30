import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { atualizarCliente, buscarClientePorId } from '../../services/ClienteService';
import { Cliente } from '../../models/interfaces';


export default function ClienteDetalhes() {
    const { id } = useParams<{ id: string }>();
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        const buscaCliente = async () => {
            setLoading(true);
            try {
                const dados = await buscarClientePorId(Number(id));
                setCliente(dados);
            } catch (error) {
                console.error("Erro ao buscar cliente:", error);
            } finally {
                setLoading(false);
            }
        };

        buscaCliente();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!cliente) return;
        const { name, value } = e.target;

        if (name.startsWith("endereco.")) {
            const enderecoField = name.split(".")[1];
            setCliente(prev => prev ? {
                ...prev,
                endereco: {
                    ...prev.endereco,
                    [enderecoField]: value
                }
            } : null);
        } else {
            setCliente(prev => prev ? { ...prev, [name]: value } : null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cliente) {
            await atualizarCliente(cliente);
            setMensagem('Alterações salvas com sucesso!');
            setEditando(false);
        }
    };

    const renderInput = (
        label: string,
        name: string,
        value: string | null,
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
                    value={value ?? ''}
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

    if (mensagem) {
        return (
            <div className="container py-4">
                <div className="alert alert-success">{mensagem}</div>
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
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            <i className="bi bi-check me-2" /> Salvar
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={() => setEditando(true)}>
                            <i className="bi bi-pencil me-2" /> Editar
                        </button>
                    )}
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações do Cliente</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {renderInput('Nome', 'nome', cliente.nome)}
                        {renderInput('Nome Social', 'nomeSocial', cliente.nomeSocial)}
                        {renderInput('E-mail', 'email', cliente.email, 'email')}

                        <h5 className="mt-4">Endereço</h5>
                        {renderInput('Rua', 'endereco.rua', cliente.endereco.rua)}
                        {renderInput('Número', 'endereco.numero', cliente.endereco.numero)}
                        {renderInput('Bairro', 'endereco.bairro', cliente.endereco.bairro)}
                        {renderInput('Cidade', 'endereco.cidade', cliente.endereco.cidade)}
                        {renderInput('Estado', 'endereco.estado', cliente.endereco.estado)}
                        {renderInput('CEP', 'endereco.codigoPostal', cliente.endereco.codigoPostal)}
                        {renderInput('Complemento', 'endereco.informacoesAdicionais', cliente.endereco.informacoesAdicionais)}
                    </form>
                </div>
            </div>
        </div>
    );
}
