import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface ProdutoData {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    quantidade: number;
    categoria: string;
    fornecedor: string;
}

export default function ProdutoDetalhes() {
    const { id } = useParams<{ id: string }>();
    const [produto, setProduto] = useState<ProdutoData | null>(null);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        fetch('/produtos.json')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar os dados do produto');
                return res.json();
            })
            .then((data: ProdutoData[]) => {
                const produtoEncontrado = data.find(p => p.id === Number(id));
                if (produtoEncontrado) {
                    setProduto(produtoEncontrado);
                } else {
                    setMensagem('Produto não encontrado');
                }
            })
            .catch((err) => setMensagem(`Erro: ${err.message}`))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!produto) return;
        
        const { name, value } = e.target;
        setProduto(prev => {
            if (!prev) return null;
            return {
                ...prev,
                [name]: name === 'preco' || name === 'quantidade' ? parseFloat(value) : value
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você implementaria a lógica para salvar as alterações
        setMensagem('Alterações salvas com sucesso!');
        setEditando(false);
    };

    const renderField = (
        label: string,
        name: keyof ProdutoData,
        type: 'text' | 'number' | 'textarea' = 'text'
    ) => (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            {editando ? (
                type === 'textarea' ? (
                    <textarea
                        className="form-control"
                        name={name}
                        value={produto?.[name] || ''}
                        onChange={handleChange}
                        rows={3}
                    />
                ) : (
                    <input
                        type={type}
                        className="form-control"
                        name={name}
                        value={produto?.[name] || ''}
                        onChange={handleChange}
                    />
                )
            ) : (
                <p className="form-control-plaintext">
                    {name === 'preco' 
                        ? `R$ ${(produto?.[name] || 0).toFixed(2)}`
                        : produto?.[name] || ''}
                </p>
            )}
        </div>
    );

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
                <div className="alert alert-success" role="alert">
                    {mensagem}
                </div>
                <Link to="/produtos" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar para Produtos
                </Link>
            </div>
        );
    }

    if (!produto) {
        return (
            <div className="container py-4">
                <div className="alert alert-warning" role="alert">
                    Produto não encontrado
                </div>
                <Link to="/produtos" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar para Produtos
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Detalhes do Produto</h2>
                <div>
                    <Link to="/produtos" className="btn btn-outline-secondary me-2">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar
                    </Link>
                    <button
                        className="btn btn-primary"
                        onClick={() => setEditando(!editando)}
                    >
                        <i className={`bi bi-${editando ? 'check' : 'pencil'} me-2`}></i>
                        {editando ? 'Salvar' : 'Editar'}
                    </button>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações do Produto</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {renderField('Nome', 'nome')}
                        {renderField('Preço', 'preco', 'number')}
                        {renderField('Descrição', 'descricao', 'textarea')}
                        {renderField('Quantidade em Estoque', 'quantidade', 'number')}
                        {renderField('Categoria', 'categoria')}
                        {renderField('Fornecedor', 'fornecedor')}
                    </form>
                </div>
            </div>
        </div>
    );
}