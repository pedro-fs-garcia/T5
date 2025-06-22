import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProdutos, useDeleteProduto } from '../../hooks';
import { formatCurrency } from '../../utils/apiUtils';

export default function ProdutoList() {
    const [busca, setBusca] = useState('');
    const { data: produtos, loading, error, execute: fetchProdutos } = useProdutos();
    const { execute: deleteProduto } = useDeleteProduto();

    useEffect(() => {
        fetchProdutos();
    }, [fetchProdutos]);

    const produtosFiltrados = produtos?.filter(produto => 
        produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
        (produto.descricao && produto.descricao.toLowerCase().includes(busca.toLowerCase()))
    ) || [];

    const handleDelete = async (id: number) => {
        const confirmacao = window.confirm("Tem certeza que deseja excluir este produto?");
        if (!confirmacao) return;

        await deleteProduto(id);
        fetchProdutos(); // Recarregar lista após exclusão
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
                    Erro ao carregar produtos: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Produtos</h2>
                <Link to="/produtos/novo" className="btn btn-success">
                    <i className="bi bi-plus-lg me-2"></i>
                    Novo Produto
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
                {produtosFiltrados.map((produto) => (
                    <div key={produto.id} className="col">
                        <div className="card h-100 shadow-sm">
                            <div className="card-header bg-success text-white">
                                <h5 className="mb-0">{produto.nome}</h5>
                            </div>
                            <div className="card-body">
                                {produto.descricao && (
                                    <p className="card-text text-muted mb-3">
                                        {produto.descricao}
                                    </p>
                                )}
                                <div className="mb-3">
                                    <small className="text-muted d-block">
                                        Estoque: {produto.estoque} unidades
                                    </small>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="h5 mb-0">
                                        {formatCurrency(produto.preco)}
                                    </span>
                                </div>
                            </div>
                            <div className="card-footer bg-white border-top-0">
                                <div className="d-flex flex-column gap-2">
                                    <Link
                                        to={`/produtos/${produto.id}`}
                                        className="btn btn-outline-success btn-sm"
                                    >
                                        <i className="bi bi-eye me-1"></i>
                                        Detalhes
                                    </Link>
                                    <Link
                                        to={`/produtos/${produto.id}/editar`}
                                        className="btn btn-outline-secondary btn-sm"
                                    >
                                        <i className="bi bi-pencil me-1"></i>
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(produto.id)}
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

            {produtosFiltrados.length === 0 && (
                <div className="alert alert-info" role="alert">
                    Nenhum produto encontrado com os critérios de busca.
                </div>
            )}
        </div>
    );
} 