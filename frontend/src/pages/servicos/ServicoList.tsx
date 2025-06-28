import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useServicos, useDeleteServico } from '../../hooks';
import { formatCurrency } from '../../utils/apiUtils';

export default function ServicosList() {
    const [busca, setBusca] = useState('');
    const { data: servicos, loading, error, execute: fetchServicos } = useServicos();
    const { execute: deleteServico } = useDeleteServico();

    useEffect(() => {
        fetchServicos();
    }, [fetchServicos]);

    const servicosFiltrados = servicos?.filter(servico => 
        servico.nome.toLowerCase().includes(busca.toLowerCase()) ||
        (servico.descricao && servico.descricao.toLowerCase().includes(busca.toLowerCase()))
    ) || [];

    const handleDelete = async (id: number) => {
        const confirmacao = window.confirm("Tem certeza que deseja excluir este serviço?");
        if (!confirmacao) return;

        await deleteServico(id);
        fetchServicos(); // Recarregar lista após exclusão
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
                    Erro ao carregar serviços: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Serviços</h2>
                <Link to="/servicos/novo" className="btn btn-success">
                    <i className="bi bi-plus-lg me-2"></i>
                    Novo Serviço
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
                            placeholder="Buscar por nome ou descrição..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {servicosFiltrados.map((servico) => (
                    <div key={servico.id} className="col">
                        <div className="card h-100 shadow-sm">
                            <div className="card-header bg-success text-white">
                                <h5 className="mb-0">{servico.nome}</h5>
                            </div>
                            <div className="card-body">
                                {servico.descricao && (
                                    <p className="card-text text-muted mb-3">
                                        {servico.descricao}
                                    </p>
                                )}
                                <div className="mb-3">
                                    <small className="text-muted d-block">
                                        Duração: {servico.duracao_minutos} minutos
                                    </small>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="h5 mb-0">
                                        {formatCurrency(servico.preco)}
                                    </span>
                                </div>
                            </div>
                            <div className="card-footer bg-white border-top-0">
                                <div className="d-flex flex-column gap-2">
                                    <Link
                                        to={`/servicos/${servico.id}`}
                                        className="btn btn-outline-success btn-sm"
                                    >
                                        <i className="bi bi-eye me-1"></i>
                                        Detalhes
                                    </Link>
                                    <Link
                                        to={`/servicos/${servico.id}/editar`}
                                        className="btn btn-outline-secondary btn-sm"
                                    >
                                        <i className="bi bi-pencil me-1"></i>
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(servico.id)}
                                        className="btn btn-outline-danger btn-sm"
                                    >
                                        <i className="bi bi-trash me-1"></i>
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {servicosFiltrados.length === 0 && (
                <div className="alert alert-info" role="alert">
                    Nenhum serviço encontrado com os critérios de busca.
                </div>
            )}
        </div>
    );
} 