import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface Cliente {
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

interface Servico {
    id: number;
    nome: string;
    preco: number;
}

interface ItemVenda {
    id: number;
    produto?: Produto;
    servico?: Servico;
    quantidade: number;
    subtotal: number;
}

interface VendaData {
    id: number;
    data: string;
    cliente: Cliente;
    itens: ItemVenda[];
    total: number;
    status: string;
    formaPagamento: string;
}

interface Props {
    editar: string; // "true" ou "false"
}

export default function DetalheVenda({ editar: editarProp }: Props) {
    const { id } = useParams<{ id: string }>();
    const [venda, setVenda] = useState<VendaData | null>(null);
    const [mensagem, setMensagem] = useState('');
    const [loading, setLoading] = useState(true);
    const editar = editarProp === 'true';

    useEffect(() => {
        fetch('/vendas.json')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar os dados da venda');
                return res.json();
            })
            .then((data: VendaData[]) => {
                const vendaEncontrada = data.find((v) => String(v.id) === id);
                if (!vendaEncontrada) {
                    setMensagem('Venda não encontrada.');
                    return;
                }
                setVenda(vendaEncontrada);
            })
            .catch((err) => setMensagem(`Erro: ${err.message}`))
            .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!venda) return;

        try {
            // Aqui você implementaria a lógica para salvar as alterações
            setMensagem('Venda atualizada com sucesso!');
        } catch (error) {
            setMensagem(`Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
    };

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
            pix: 'PIX'
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

    if (!venda) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger" role="alert">
                    {mensagem || 'Venda não encontrada'}
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
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="mb-4">
                                    <h5>Informações da Venda</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><strong>Número:</strong> #{venda.id}</p>
                                            <p><strong>Data:</strong> {formatarData(venda.data)}</p>
                                            <p><strong>Status:</strong> {getStatusLabel(venda.status)}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p><strong>Forma de Pagamento:</strong> {getFormaPagamentoLabel(venda.formaPagamento)}</p>
                                            <p><strong>Total:</strong> R$ {venda.total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h5>Cliente</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><strong>Nome:</strong> {venda.cliente.nome}</p>
                                            <p><strong>Email:</strong> {venda.cliente.email}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p><strong>Telefone:</strong> {venda.cliente.telefone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h5>Itens da Venda</h5>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Quantidade</th>
                                                    <th>Preço Unit.</th>
                                                    <th>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {venda.itens.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            {item.produto ? item.produto.nome : item.servico?.nome}
                                                        </td>
                                                        <td>{item.quantidade}</td>
                                                        <td>
                                                            R$ {(item.produto ? item.produto.preco : item.servico?.preco || 0).toFixed(2)}
                                                        </td>
                                                        <td>R$ {item.subtotal.toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {mensagem && (
                                    <div className={`alert ${mensagem.includes('Erro') ? 'alert-danger' : 'alert-success'}`} role="alert">
                                        {mensagem}
                                    </div>
                                )}

                                <div className="mt-4 d-flex justify-content-between">
                                    <Link to="/vendas" className="btn btn-outline-secondary">
                                        Voltar
                                    </Link>
                                    {editar && (
                                        <button type="submit" className="btn btn-success">
                                            Salvar Alterações
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
