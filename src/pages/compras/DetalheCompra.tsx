import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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

export default function DetalheCompra() {
    const { id } = useParams<{ id: string }>();
    const [compra, setCompra] = useState<Compra | null>(null);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        fetch('/compras.json')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar os dados da compra');
                return res.json();
            })
            .then((data: Compra[]) => {
                const compraEncontrada = data.find(c => c.id === Number(id));
                if (compraEncontrada) {
                    setCompra(compraEncontrada);
                } else {
                    setMensagem('Compra não encontrada');
                }
            })
            .catch((err) => setMensagem(`Erro: ${err.message}`))
            .finally(() => setLoading(false));
    }, [id]);

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
                <Link to="/compras" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar para Compras
                </Link>
            </div>
        );
    }

    if (!compra) {
        return (
            <div className="container py-4">
                <div className="alert alert-warning" role="alert">
                    Compra não encontrada
                </div>
                <Link to="/compras" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar para Compras
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Detalhes da Compra #{compra.id}</h2>
                <div>
                    <Link to="/compras" className="btn btn-outline-secondary me-2">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar
                    </Link>
                    <Link to={`/compras/${compra.id}/editar`} className="btn btn-primary">
                        <i className="bi bi-pencil me-2"></i>
                        Editar
                    </Link>
                </div>
            </div>

            <div className="card shadow-sm mb-4">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações Gerais</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Data:</strong> {formatarData(compra.data)}</p>
                            <p><strong>Status:</strong> {getStatusLabel(compra.status)}</p>
                            <p><strong>Forma de Pagamento:</strong> {getFormaPagamentoLabel(compra.formaPagamento)}</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>Fornecedor:</strong> {compra.fornecedor.nome}</p>
                            <p><strong>Email:</strong> {compra.fornecedor.email}</p>
                            <p><strong>Telefone:</strong> {compra.fornecedor.telefone}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Itens da Compra</h5>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Quantidade</th>
                                    <th>Preço Unitário</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {compra.itens.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.produto.nome}</td>
                                        <td>{item.quantidade}</td>
                                        <td>R$ {item.produto.preco.toFixed(2)}</td>
                                        <td>R$ {item.subtotal.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={3} className="text-end"><strong>Total:</strong></td>
                                    <td><strong>R$ {compra.total.toFixed(2)}</strong></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}