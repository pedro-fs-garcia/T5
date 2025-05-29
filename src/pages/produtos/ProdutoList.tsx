import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ProdutoData {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    quantidade: number;
    categoria: string;
    fornecedor: string;
}

export default function ProdutoList() {
    const [produtos, setProdutos] = useState<ProdutoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        fetch('/produtos.json')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar os produtos');
                return res.json();
            })
            .then((data: ProdutoData[]) => {
                setProdutos(data);
            })
            .catch((err) => setMensagem(`Erro: ${err.message}`))
            .finally(() => setLoading(false));
    }, []);

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
                <div className="alert alert-danger" role="alert">
                    {mensagem}
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

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {produtos.map((produto) => (
                    <div key={produto.id} className="col">
                        <div className="card h-100 shadow-sm">
                            <div className="card-header bg-success text-white">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">{produto.nome}</h5>
                                    <span className="badge bg-light text-dark">
                                        {produto.categoria}
                                    </span>
                                </div>
                            </div>
                            <div className="card-body">
                                <p className="card-text text-muted mb-3">
                                    {produto.descricao}
                                </p>
                                <div className="mb-3">
                                    <small className="text-muted d-block">
                                        Fornecedor: {produto.fornecedor}
                                    </small>
                                    <small className="text-muted d-block">
                                        Estoque: {produto.quantidade} unidades
                                    </small>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="h5 mb-0">
                                        R$ {produto.preco.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <div className="card-footer bg-white border-top-0">
                                <div className="d-flex justify-content-between">
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
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 