import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProdutoById, useUpdateProduto } from '../../hooks';
import { UpdateProdutoRequest } from '../../types/api';
import { formatCurrency } from '../../utils/apiUtils';

interface ProdutoFormData {
    nome: string;
    descricao: string;
    preco: number;
    estoque: number;
}

export default function ProdutoDetalhes() {
    const { id } = useParams<{ id: string }>();
    const { data: produto, loading, error, execute: fetchProduto } = useProdutoById(id ? parseInt(id) : 0);
    const { execute: updateProduto, loading: loadingUpdate, error: errorUpdate } = useUpdateProduto();
    
    const [editando, setEditando] = useState(false);
    const [formData, setFormData] = useState<ProdutoFormData>({
        nome: '',
        descricao: '',
        preco: 0,
        estoque: 0
    });
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        if (produto) {
            setFormData({
                nome: produto.nome,
                descricao: produto.descricao || '',
                preco: produto.preco,
                estoque: produto.estoque
            });
        }
    }, [produto]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'preco' || name === 'estoque' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!produto || !id) return;

        // Validações básicas
        if (!formData.nome.trim()) {
            setMensagem('O nome do produto é obrigatório');
            return;
        }
        if (formData.preco <= 0) {
            setMensagem('O preço deve ser maior que zero');
            return;
        }
        if (formData.estoque < 0) {
            setMensagem('A quantidade não pode ser negativa');
            return;
        }

        const produtoData: UpdateProdutoRequest = {
            nome: formData.nome.trim(),
            descricao: formData.descricao.trim(),
            preco: formData.preco,
            estoque: formData.estoque
        };

        await updateProduto(parseInt(id), produtoData);
        
        // Se não houve erro, sair do modo de edição
        if (!errorUpdate) {
            setEditando(false);
            setMensagem('Produto atualizado com sucesso!');
            // Recarregar dados do produto
            fetchProduto(parseInt(id));
        }
    };

    const handleCancel = () => {
        if (produto) {
            setFormData({
                nome: produto.nome,
                descricao: produto.descricao || '',
                preco: produto.preco,
                estoque: produto.estoque
            });
        }
        setEditando(false);
        setMensagem('');
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
                    Erro ao carregar produto: {error}
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

    const renderField = (
        label: string,
        name: keyof ProdutoFormData,
        type: 'text' | 'number' | 'textarea' = 'text'
    ) => (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            {editando ? (
                type === 'textarea' ? (
                    <textarea
                        className="form-control"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        rows={3}
                    />
                ) : (
                    <input
                        type={type}
                        className="form-control"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        required
                    />
                )
            ) : (
                <p className="form-control-plaintext">
                    {name === 'preco' 
                        ? formatCurrency(formData[name])
                        : name === 'estoque'
                        ? `${formData[name]} unidades`
                        : formData[name] || ''}
                </p>
            )}
        </div>
    );

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Detalhes do Produto</h2>
                <div>
                    <Link to="/produtos" className="btn btn-outline-secondary me-2">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar
                    </Link>
                    {!editando ? (
                        <button
                            className="btn btn-primary"
                            onClick={() => setEditando(true)}
                        >
                            <i className="bi bi-pencil me-2"></i>
                            Editar
                        </button>
                    ) : (
                        <div>
                            <button
                                className="btn btn-outline-secondary me-2"
                                onClick={handleCancel}
                            >
                                <i className="bi bi-x me-2"></i>
                                Cancelar
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={handleSubmit}
                                disabled={loadingUpdate}
                            >
                                {loadingUpdate ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check me-2"></i>
                                        Salvar
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {mensagem && (
                <div className="alert alert-success" role="alert">
                    {mensagem}
                </div>
            )}

            {errorUpdate && (
                <div className="alert alert-danger" role="alert">
                    Erro ao atualizar produto: {errorUpdate}
                </div>
            )}

            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações do Produto</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {renderField('Nome', 'nome')}
                        {renderField('Preço', 'preco', 'number')}
                        {renderField('Descrição', 'descricao', 'textarea')}
                        {renderField('Quantidade em Estoque', 'estoque', 'number')}
                    </form>
                </div>
            </div>
        </div>
    );
}