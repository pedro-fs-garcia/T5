import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useClienteProdutos, useClienteServicos } from '../../hooks';
import { formatCurrency } from '../../utils/apiUtils';

interface VendaCompleta {
    id: number;
    tipo: 'produto' | 'servico';
    cliente_id: number;
    cliente_nome?: string;
    data: Date;
    valor_total: number;
    status: string;
}

export default function VendaList() {
    const [vendas, setVendas] = useState<VendaCompleta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const { data: vendasProdutos, error: errorProdutos, execute: fetchVendasProdutos } = useClienteProdutos();
    const { data: vendasServicos, error: errorServicos, execute: fetchVendasServicos } = useClienteServicos();

    useEffect(() => {
        const carregarVendas = async () => {
            try {
                await Promise.all([
                    fetchVendasProdutos(),
                    fetchVendasServicos()
                ]);
            } catch {
                setError('Erro ao carregar vendas');
            }
        };

        carregarVendas();
    }, [fetchVendasProdutos, fetchVendasServicos]);

    useEffect(() => {
        if (vendasProdutos && vendasServicos) {
            const vendasCompletas: VendaCompleta[] = [
                ...vendasProdutos.map(venda => ({
                    id: venda.id,
                    tipo: 'produto' as const,
                    cliente_id: venda.cliente_id,
                    data: new Date(venda.data_compra),
                    valor_total: venda.valor_total,
                    status: 'concluida'
                })),
                ...vendasServicos.map(venda => ({
                    id: venda.id,
                    tipo: 'servico' as const,
                    cliente_id: venda.cliente_id,
                    data: new Date(venda.data_realizacao),
                    valor_total: venda.valor_total,
                    status: 'concluida'
                }))
            ];

            // Ordenar por data (mais recente primeiro)
            vendasCompletas.sort((a, b) => b.data.getTime() - a.data.getTime());
            setVendas(vendasCompletas);
            setLoading(false);
        }
    }, [vendasProdutos, vendasServicos]);

    useEffect(() => {
        if (errorProdutos || errorServicos) {
            setError('Erro ao carregar vendas');
            setLoading(false);
        }
    }, [errorProdutos, errorServicos]);

    const formatarData = (data: Date) => {
        return data.toLocaleDateString('pt-BR');
    };

    const getTipoLabel = (tipo: 'produto' | 'servico') => {
        return tipo === 'produto' ? 'Produto' : 'Serviço';
    };

    const getStatusLabel = (status: string) => {
        const statusMap: { [key: string]: string } = {
            concluida: 'Concluída',
            pendente: 'Pendente',
            cancelada: 'Cancelada'
        };
        return statusMap[status] || status;
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
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Vendas</h2>
                <Link to="/vendas/novo" className="btn btn-success">
                    <i className="bi bi-plus-lg me-2"></i>
                    Nova Venda
                </Link>
            </div>

            {vendas.length === 0 ? (
                <div className="alert alert-info">
                    <h5>Nenhuma venda encontrada</h5>
                    <p className="mb-0">
                        Não há vendas registradas no sistema. 
                        Clique em "Nova Venda" para registrar a primeira venda.
                    </p>
                </div>
            ) : (
                <div className="card shadow-sm">
                    <div className="card-header bg-light">
                        <h6 className="mb-0">Histórico de Vendas</h6>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tipo</th>
                                        <th>Cliente ID</th>
                                        <th>Data</th>
                                        <th>Valor Total</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendas.map((venda) => (
                                        <tr key={`${venda.tipo}-${venda.id}`}>
                                            <td>#{venda.id}</td>
                                            <td>
                                                <span className={`badge ${venda.tipo === 'produto' ? 'bg-primary' : 'bg-success'}`}>
                                                    {getTipoLabel(venda.tipo)}
                                                </span>
                                            </td>
                                            <td>{venda.cliente_id}</td>
                                            <td>{formatarData(venda.data)}</td>
                                            <td>{formatCurrency(venda.valor_total)}</td>
                                            <td>
                                                <span className="badge bg-success">
                                                    {getStatusLabel(venda.status)}
                                                </span>
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/vendas/${venda.tipo}/${venda.id}`}
                                                    className="btn btn-outline-primary btn-sm"
                                                >
                                                    <i className="bi bi-eye me-1"></i>
                                                    Ver
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 