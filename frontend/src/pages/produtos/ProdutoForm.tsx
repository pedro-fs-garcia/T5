import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateProduto } from '../../hooks';
import { CreateProdutoRequest } from '../../types/api';

interface ProdutoData {
    nome: string;
    descricao: string;
    preco: number;
    estoque: number;
}

export default function ProdutoForm() {
    const navigate = useNavigate();
    const { execute: createProduto, loading, error } = useCreateProduto();
    
    const [produto, setProduto] = useState<ProdutoData>({
        nome: '',
        descricao: '',
        preco: 0,
        estoque: 0
    });
    const [mensagem, setMensagem] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduto(prev => ({
            ...prev,
            [name]: name === 'preco' || name === 'estoque' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validações básicas
        if (!produto.nome.trim()) {
            setMensagem('O nome do produto é obrigatório');
            return;
        }
        if (produto.preco <= 0) {
            setMensagem('O preço deve ser maior que zero');
            return;
        }
        if (produto.estoque < 0) {
            setMensagem('A quantidade não pode ser negativa');
            return;
        }

        const produtoData: CreateProdutoRequest = {
            nome: produto.nome.trim(),
            descricao: produto.descricao.trim(),
            preco: produto.preco,
            estoque: produto.estoque
        };

        await createProduto(produtoData);
        
        // Se não houve erro, redirecionar para a lista
        if (!error) {
            navigate('/produtos');
        }
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Novo Produto</h2>
                <Link to="/produtos" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar
                </Link>
            </div>

            {mensagem && (
                <div className="alert alert-warning" role="alert">
                    {mensagem}
                </div>
            )}

            {error && (
                <div className="alert alert-danger" role="alert">
                    Erro ao criar produto: {error}
                </div>
            )}

            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações do Produto</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nome"
                                value={produto.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Preço</label>
                            <input
                                type="number"
                                className="form-control"
                                name="preco"
                                value={produto.preco}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Descrição</label>
                            <textarea
                                className="form-control"
                                name="descricao"
                                value={produto.descricao}
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Quantidade em Estoque</label>
                            <input
                                type="number"
                                className="form-control"
                                name="estoque"
                                value={produto.estoque}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </div>

                        <div className="d-grid">
                            <button 
                                type="submit" 
                                className="btn btn-success"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-lg me-2"></i>
                                        Registrar Produto
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