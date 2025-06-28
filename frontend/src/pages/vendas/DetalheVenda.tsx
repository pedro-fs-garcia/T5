import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useClienteProdutoById, useClienteServicoById, useCliente } from '../../hooks';
import { formatCurrency } from '../../utils/apiUtils';

interface VendaDetalhes {
    id: number;
    tipo: 'produto' | 'servico';
    cliente_id: number;
    cliente_nome?: string;
    data: Date;
    valor_total: number;
    valor_unitario: number;
    desconto: number;
    quantidade?: number;
    observacoes?: string;
    produto_nome?: string;
    servico_nome?: string;
}

interface Props {
    editar: string; // "true" ou "false"
}

export default function DetalheVenda({ editar: editarProp }: Props) {
    const { id, tipo } = useParams<{ id: string; tipo: string }>();
    const [venda, setVenda] = useState<VendaDetalhes | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const editar = editarProp === 'true';

    const { data: vendaProduto, error: errorProduto, execute: fetchVendaProduto } = useClienteProdutoById(0);
    const { data: vendaServico, error: errorServico, execute: fetchVendaServico } = useClienteServicoById(0);
    const { data: cliente, execute: fetchCliente } = useCliente();

    useEffect(() => {
        if (id && tipo) {
            const vendaId = parseInt(id);
            
            if (tipo === 'produto') {
                fetchVendaProduto(vendaId);
            } else if (tipo === 'servico') {
                fetchVendaServico(vendaId);
            } else {
                setError('Tipo de venda inválido');
                setLoading(false);
            }
        } else {
            setError('ID ou tipo de venda não informado');
            setLoading(false);
        }
    }, [id, tipo, fetchVendaProduto, fetchVendaServico]);

    useEffect(() => {
        if (vendaProduto && tipo === 'produto') {
            setVenda({
                id: vendaProduto.id,
                tipo: 'produto',
                cliente_id: vendaProduto.cliente_id,
                cliente_nome: vendaProduto.cliente_nome,
                produto_nome: vendaProduto.produto_nome,
                data: new Date(vendaProduto.data_compra),
                valor_total: vendaProduto.valor_total,
                valor_unitario: vendaProduto.valor_unitario,
                desconto: vendaProduto.desconto,
                quantidade: vendaProduto.quantidade
            });
            fetchCliente(vendaProduto.cliente_id);
            setLoading(false);
        } else if (vendaServico && tipo === 'servico') {
            setVenda({
                id: vendaServico.id,
                tipo: 'servico',
                cliente_id: vendaServico.cliente_id,
                cliente_nome: vendaServico.cliente_nome,
                servico_nome: vendaServico.servico_nome,
                data: new Date(vendaServico.data_realizacao),
                valor_total: vendaServico.valor_total,
                valor_unitario: vendaServico.valor_unitario,
                desconto: vendaServico.desconto,
                observacoes: vendaServico.observacoes
            });
            fetchCliente(vendaServico.cliente_id);
            setLoading(false);
        }
    }, [vendaProduto, vendaServico, tipo, fetchCliente]);

    useEffect(() => {
        if (errorProduto || errorServico) {
            setError('Erro ao carregar dados da venda');
            setLoading(false);
        }
    }, [errorProduto, errorServico]);

    const formatarData = (data: Date) => {
        return data.toLocaleDateString('pt-BR');
    };

    const getTipoLabel = (tipo: 'produto' | 'servico') => {
        return tipo === 'produto' ? 'Produto' : 'Serviço';
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

    if (error || !venda) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger" role="alert">
                    {error || 'Venda não encontrada'}
                </div>
                <Link to="/vendas" className="btn btn-secondary">
                    Voltar para Lista
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-success text-white">
                            <h4 className="mb-0">
                                {editar ? 'Editar Venda' : 'Detalhes da Venda'}
                            </h4>
                        </div>
                        <div className="card-body">
                            <div className="mb-4">
                                <h5>Informações da Venda</h5>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><strong>Número:</strong> #{venda.id}</p>
                                        <p><strong>Tipo:</strong> {getTipoLabel(venda.tipo)}</p>
                                        <p><strong>Data:</strong> {formatarData(venda.data)}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>Valor Unitário:</strong> {formatCurrency(venda.valor_unitario)}</p>
                                        <p><strong>Desconto:</strong> {formatCurrency(venda.desconto)}</p>
                                        <p><strong>Total:</strong> {formatCurrency(venda.valor_total)}</p>
                                    </div>
                                </div>
                            </div>

                            {cliente && (
                                <div className="mb-4">
                                    <h5>Cliente</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><strong>Nome:</strong> {cliente.nome}</p>
                                            <p><strong>Email:</strong> {cliente.email}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p><strong>ID:</strong> {cliente.id}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mb-4">
                                <h5>Detalhes do Item</h5>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Descrição</th>
                                                <th>Valor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><strong>Tipo de Venda</strong></td>
                                                <td>{getTipoLabel(venda.tipo)}</td>
                                            </tr>
                                            {venda.tipo === 'produto' && venda.produto_nome && (
                                                <tr>
                                                    <td><strong>Produto</strong></td>
                                                    <td>{venda.produto_nome}</td>
                                                </tr>
                                            )}
                                            {venda.tipo === 'servico' && venda.servico_nome && (
                                                <tr>
                                                    <td><strong>Serviço</strong></td>
                                                    <td>{venda.servico_nome}</td>
                                                </tr>
                                            )}
                                            {venda.quantidade && (
                                                <tr>
                                                    <td><strong>Quantidade</strong></td>
                                                    <td>{venda.quantidade}</td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td><strong>Valor Unitário</strong></td>
                                                <td>{formatCurrency(venda.valor_unitario)}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Desconto</strong></td>
                                                <td>{formatCurrency(venda.desconto)}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Valor Total</strong></td>
                                                <td><strong>{formatCurrency(venda.valor_total)}</strong></td>
                                            </tr>
                                            {venda.observacoes && (
                                                <tr>
                                                    <td><strong>Observações</strong></td>
                                                    <td>{venda.observacoes}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="mt-4 d-flex justify-content-between">
                                <Link to="/vendas" className="btn btn-outline-secondary">
                                    Voltar
                                </Link>
                                {editar && (
                                    <button type="button" className="btn btn-success" disabled>
                                        Edição não implementada
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
