import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface FornecedorData {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    cnpj: string;
    observacoes: string;
}

interface ProdutoData {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    quantidade: number;
    categoria: string;
    fornecedor: string;
}

interface ServicoData {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    duracao: string;
    categoria: string;
}

interface ItemCompra {
    id: number;
    tipo: 'produto' | 'servico';
    nome: string;
    preco: number;
    quantidade: number;
    subtotal: number;
}

interface CompraData {
    fornecedorId: number;
    data: string;
    itens: ItemCompra[];
    total: number;
    formaPagamento: string;
    status: 'pendente' | 'concluida';
}

export default function RegistroCompra() {
    const [fornecedores, setFornecedores] = useState<FornecedorData[]>([]);
    const [produtos, setProdutos] = useState<ProdutoData[]>([]);
    const [servicos, setServicos] = useState<ServicoData[]>([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState<number>(0);
    const [itens, setItens] = useState<ItemCompra[]>([]);
    const [tipoItem, setTipoItem] = useState<'produto' | 'servico'>('produto');
    const [itemSelecionado, setItemSelecionado] = useState<number>(0);
    const [quantidade, setQuantidade] = useState<number>(1);
    const [formaPagamento, setFormaPagamento] = useState<string>('');
    const [mensagem, setMensagem] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/fornecedores.json').then(res => res.json()),
            fetch('/produtos.json').then(res => res.json()),
            fetch('/servicos.json').then(res => res.json())
        ])
            .then(([fornecedoresData, produtosData, servicosData]) => {
                setFornecedores(fornecedoresData);
                setProdutos(produtosData);
                setServicos(servicosData);
            })
            .catch((err) => setMensagem(`Erro: ${err.message}`))
            .finally(() => setLoading(false));
    }, []);

    const adicionarItem = () => {
        if (!itemSelecionado || quantidade <= 0) {
            setMensagem('Selecione um item e informe a quantidade');
            return;
        }

        const item = tipoItem === 'produto'
            ? produtos.find(p => p.id === itemSelecionado)
            : servicos.find(s => s.id === itemSelecionado);

        if (!item) return;

        const novoItem: ItemCompra = {
            id: Date.now(),
            tipo: tipoItem,
            nome: item.nome,
            preco: item.preco,
            quantidade: quantidade,
            subtotal: item.preco * quantidade
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!fornecedorSelecionado) {
            setMensagem('Selecione um fornecedor');
            return;
        }

        if (itens.length === 0) {
            setMensagem('Adicione pelo menos um item à compra');
            return;
        }

        if (!formaPagamento) {
            setMensagem('Selecione a forma de pagamento');
            return;
        }

        const compra: CompraData = {
            fornecedorId: fornecedorSelecionado,
            data: new Date().toISOString().split('T')[0],
            itens: itens,
            total: calcularTotal(),
            formaPagamento: formaPagamento,
            status: 'pendente'
        };

        // Aqui você implementaria a lógica para salvar a compra
        setMensagem('Compra registrada com sucesso!');
        setFornecedorSelecionado(0);
        setItens([]);
        setFormaPagamento('');
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

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Registrar Nova Compra</h2>
                <Link to="/compras" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar
                </Link>
            </div>

            {mensagem && (
                <div className="alert alert-success" role="alert">
                    {mensagem}
                </div>
            )}

            <div className="card shadow-sm mb-4">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações da Compra</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Fornecedor</label>
                            <select
                                className="form-select"
                                value={fornecedorSelecionado}
                                onChange={(e) => setFornecedorSelecionado(Number(e.target.value))}
                                required
                            >
                                <option value="">Selecione o fornecedor</option>
                                {fornecedores.map(fornecedor => (
                                    <option key={fornecedor.id} value={fornecedor.id}>
                                        {fornecedor.nome}
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
                                                ? produtos.map(produto => (
                                                    <option key={produto.id} value={produto.id}>
                                                        {produto.nome} - R$ {produto.preco.toFixed(2)}
                                                    </option>
                                                ))
                                                : servicos.map(servico => (
                                                    <option key={servico.id} value={servico.id}>
                                                        {servico.nome} - R$ {servico.preco.toFixed(2)}
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
                                    <h6 className="mb-0">Itens da Compra</h6>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Tipo</th>
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
                                                        <td>{item.tipo === 'produto' ? 'Produto' : 'Serviço'}</td>
                                                        <td>{item.nome}</td>
                                                        <td>R$ {item.preco.toFixed(2)}</td>
                                                        <td>{item.quantidade}</td>
                                                        <td>R$ {item.subtotal.toFixed(2)}</td>
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
                                                    <td colSpan={4} className="text-end">
                                                        <strong>Total:</strong>
                                                    </td>
                                                    <td>
                                                        <strong>R$ {calcularTotal().toFixed(2)}</strong>
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
                            <button type="submit" className="btn btn-success">
                                <i className="bi bi-save me-2"></i>
                                Registrar Compra
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
