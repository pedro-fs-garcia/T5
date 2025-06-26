import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClientes, useProdutos, useServicos, useCreateClienteProduto, useCreateClienteServico } from '../../hooks';
import { formatCurrency } from '../../utils/apiUtils';

interface ItemVenda {
    id: number;
    tipo: 'produto' | 'servico';
    nome: string;
    preco: number;
    quantidade: number;
    subtotal: number;
    itemId: number; // ID do produto ou serviço
}

export default function RegistroVenda() {
    const navigate = useNavigate();
    const { data: clientes, loading: loadingClientes, error: errorClientes, execute: fetchClientes } = useClientes();
    const { data: produtos, loading: loadingProdutos, error: errorProdutos, execute: fetchProdutos } = useProdutos();
    const { data: servicos, loading: loadingServicos, error: errorServicos, execute: fetchServicos } = useServicos();
    const { execute: createClienteProduto, loading: loadingCreateProduto, error: errorCreateProduto } = useCreateClienteProduto();
    const { execute: createClienteServico, loading: loadingCreateServico, error: errorCreateServico } = useCreateClienteServico();
    
    const [clienteSelecionado, setClienteSelecionado] = useState<number>(0);
    const [itens, setItens] = useState<ItemVenda[]>([]);
    const [tipoItem, setTipoItem] = useState<'produto' | 'servico'>('produto');
    const [itemSelecionado, setItemSelecionado] = useState<number>(0);
    const [quantidade, setQuantidade] = useState<number>(1);
    const [formaPagamento, setFormaPagamento] = useState<string>('');
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        const carregarDados = async () => {
            try {
                await Promise.all([
                    fetchClientes(),
                    fetchProdutos(),
                    fetchServicos()
                ]);
            } catch {
                setMensagem('Erro ao carregar dados');
            }
        };

        carregarDados();
    }, [fetchClientes, fetchProdutos, fetchServicos]);

    const adicionarItem = () => {
        if (!itemSelecionado || quantidade <= 0) {
            setMensagem('Selecione um item e informe a quantidade');
            return;
        }

        const item = tipoItem === 'produto'
            ? produtos?.find(p => p.id === itemSelecionado)
            : servicos?.find(s => s.id === itemSelecionado);

        if (!item) return;

        const novoItem: ItemVenda = {
            id: Date.now(),
            tipo: tipoItem,
            nome: item.nome,
            preco: item.preco,
            quantidade: quantidade,
            subtotal: item.preco * quantidade,
            itemId: item.id
        };

        setItens(prev => [...prev, novoItem]);
        setItemSelecionado(0);
        setQuantidade(1);
    };

    const removerItem = (id: number) => {
        setItens(prev => prev.filter(item => item.id !== id));
    };

    const calcularTotal = () => {
        return itens.reduce((total, item) => total + item.subtotal, 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!clienteSelecionado) {
            setMensagem('Selecione um cliente');
            return;
        }

        if (itens.length === 0) {
            setMensagem('Adicione pelo menos um item à venda');
            return;
        }

        if (!formaPagamento) {
            setMensagem('Selecione a forma de pagamento');
            return;
        }

        try {
            // Separar itens por tipo
            const itensProdutos = itens.filter(item => item.tipo === 'produto');
            const itensServicos = itens.filter(item => item.tipo === 'servico');

            // Criar vendas de produtos
            for (const item of itensProdutos) {
                await createClienteProduto({
                    cliente_id: clienteSelecionado,
                    produto_id: item.itemId,
                    quantidade: item.quantidade,
                    data_compra: new Date(),
                    valor_unitario: item.preco,
                    desconto: 0
                });
            }

            // Criar vendas de serviços
            for (const item of itensServicos) {
                await createClienteServico({
                    cliente_id: clienteSelecionado,
                    servico_id: item.itemId,
                    data_realizacao: new Date(),
                    valor_unitario: item.preco,
                    desconto: 0,
                    observacoes: `Quantidade: ${item.quantidade}`
                });
            }

            setMensagem('Venda registrada com sucesso!');
            
            // Limpar formulário
            setClienteSelecionado(0);
            setItens([]);
            setFormaPagamento('');
            
            // Redirecionar após um breve delay
            setTimeout(() => {
                navigate('/vendas');
            }, 1500);

        } catch {
            setMensagem('Erro ao registrar venda');
        }
    };

    const loading = loadingClientes || loadingProdutos || loadingServicos;
    const error = errorClientes || errorProdutos || errorServicos || errorCreateProduto || errorCreateServico;

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
                    Erro ao carregar dados: {error}
                </div>
                <Link to="/vendas" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Registrar Nova Venda</h2>
                <Link to="/vendas" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar
                </Link>
            </div>

            {mensagem && (
                <div className={`alert ${mensagem.includes('sucesso') ? 'alert-success' : 'alert-warning'}`} role="alert">
                    {mensagem}
                </div>
            )}

            <div className="card shadow-sm mb-4">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações da Venda</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Cliente</label>
                            <select
                                className="form-select"
                                value={clienteSelecionado}
                                onChange={(e) => setClienteSelecionado(Number(e.target.value))}
                                required
                            >
                                <option value="">Selecione o cliente</option>
                                {clientes?.map(cliente => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="card mb-4">
                            <div className="card-header">
                                <h6 className="mb-0">Adicionar Item</h6>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-3">
                                        <label className="form-label">Tipo</label>
                                        <select
                                            className="form-select"
                                            value={tipoItem}
                                            onChange={(e) => setTipoItem(e.target.value as 'produto' | 'servico')}
                                        >
                                            <option value="produto">Produto</option>
                                            <option value="servico">Serviço</option>
                                        </select>
                                    </div>

                                    <div className="col-md-5">
                                        <label className="form-label">Item</label>
                                        <select
                                            className="form-select"
                                            value={itemSelecionado}
                                            onChange={(e) => setItemSelecionado(Number(e.target.value))}
                                        >
                                            <option value="">Selecione o item</option>
                                            {tipoItem === 'produto'
                                                ? produtos?.map(produto => (
                                                    <option key={produto.id} value={produto.id}>
                                                        {produto.nome} - {formatCurrency(produto.preco)}
                                                    </option>
                                                ))
                                                : servicos?.map(servico => (
                                                    <option key={servico.id} value={servico.id}>
                                                        {servico.nome} - {formatCurrency(servico.preco)}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="col-md-2">
                                        <label className="form-label">Quantidade</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={quantidade}
                                            onChange={(e) => setQuantidade(Number(e.target.value))}
                                            min="1"
                                        />
                                    </div>

                                    <div className="col-md-2 d-flex align-items-end">
                                        <button
                                            type="button"
                                            className="btn btn-success w-100"
                                            onClick={adicionarItem}
                                        >
                                            <i className="bi bi-plus-circle me-2"></i>
                                            Adicionar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {itens.length > 0 && (
                            <div className="card mb-4">
                                <div className="card-header">
                                    <h6 className="mb-0">Itens da Venda</h6>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Preço</th>
                                                    <th>Quantidade</th>
                                                    <th>Subtotal</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {itens.map(item => (
                                                    <tr key={item.id}>
                                                        <td>{item.nome}</td>
                                                        <td>{formatCurrency(item.preco)}</td>
                                                        <td>{item.quantidade}</td>
                                                        <td>{formatCurrency(item.subtotal)}</td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => removerItem(item.id)}
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan={3} className="text-end">
                                                        <strong>Total:</strong>
                                                    </td>
                                                    <td>
                                                        <strong>{formatCurrency(calcularTotal())}</strong>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label">Forma de Pagamento</label>
                            <select
                                className="form-select"
                                value={formaPagamento}
                                onChange={(e) => setFormaPagamento(e.target.value)}
                                required
                            >
                                <option value="">Selecione a forma de pagamento</option>
                                <option value="dinheiro">Dinheiro</option>
                                <option value="cartao">Cartão de Crédito/Débito</option>
                                <option value="pix">PIX</option>
                                <option value="boleto">Boleto</option>
                            </select>
                        </div>

                        <div className="d-grid">
                            <button 
                                type="submit" 
                                className="btn btn-success"
                                disabled={loadingCreateProduto || loadingCreateServico}
                            >
                                {loadingCreateProduto || loadingCreateServico ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-save me-2"></i>
                                        Registrar Venda
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 