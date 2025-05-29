import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Fornecedor {
    id: number;
    nome: string;
    email: string;
    telefone: string;
}

interface Produto {
    id: number;
    nome: string;
    preco: number;
}

interface ItemCompra {
    id: number;
    produto: Produto;
    quantidade: number;
    subtotal: number;
}

interface Compra {
    id: number;
    data: string;
    fornecedor: Fornecedor;
    itens: ItemCompra[];
    total: number;
    status: string;
    formaPagamento: string;
}

export default function ComprasList() {
    const [compras, setCompras] = useState<Compra[]>([]);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        fetch('/compras.json')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar as compras');
                return res.json();
            })
            .then((data: Compra[]) => {
                setCompras(data);
            })
            .catch((err) => setMensagem(`Erro: ${err.message}`))
            .finally(() => setLoading(false));
    }, []);

    const formatarData = (data: string) => {
        return new Date(data).toLocaleDateString('pt-BR');
    };

    const getStatusLabel = (status: string) => {
        const statusMap: { [key: string]: string } = {
            concluida: 'Concluída',
            pendente: 'Pendente',
            cancelada: 'Cancelada'
        };
        return statusMap[status] || status;
    };

    const getFormaPagamentoLabel = (forma: string) => {
        const formasMap: { [key: string]: string } = {
            cartao: 'Cartão',
            dinheiro: 'Dinheiro',
            pix: 'PIX',
            boleto: 'Boleto'
        };
        return formasMap[forma] || forma;
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
                <h2>Compras</h2>
                <Link to="/compras/novo" className="btn btn-success">
                    <i className="bi bi-plus-lg me-2"></i>
                    Nova Compra
                </Link>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {compras.map((compra) => (
                    <div key={compra.id} className="col">
                        <div className="card h-100 shadow-sm">
                            <div className="card-header bg-success text-white">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Compra #{compra.id}</h5>
                                    <span className="badge bg-light text-dark">
                                        {formatarData(compra.data)}
                                    </span>
                                </div>
                            </div>
                            <div className="card-body">
                                <h6 className="card-subtitle mb-3">
                                    Fornecedor: {compra.fornecedor.nome}
                                </h6>
                                <div className="mb-3">
                                    <small className="text-muted d-block">
                                        Itens: {compra.itens.length}
                                    </small>
                                    <small className="text-muted d-block">
                                        Status: {getStatusLabel(compra.status)}
                                    </small>
                                    <small className="text-muted d-block">
                                        Pagamento: {getFormaPagamentoLabel(compra.formaPagamento)}
                                    </small>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="h5 mb-0">
                                        Total: R$ {compra.total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <div className="card-footer bg-white border-top-0">
                                <div className="d-flex justify-content-between">
                                    <Link
                                        to={`/compras/${compra.id}`}
                                        className="btn btn-outline-success btn-sm"
                                    >
                                        <i className="bi bi-eye me-1"></i>
                                        Detalhes
                                    </Link>
                                    <Link
                                        to={`/compras/${compra.id}/editar`}
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
