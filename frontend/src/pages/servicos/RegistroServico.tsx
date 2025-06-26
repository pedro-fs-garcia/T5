import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateServico } from '../../hooks';
import { CreateServicoRequest } from '../../types/api';

interface ServicoData {
    nome: string;
    descricao: string;
    preco: number;
    duracao_minutos: number;
}

export default function RegistroServico() {
    const navigate = useNavigate();
    const { execute: createServico, loading, error } = useCreateServico();
    
    const [servico, setServico] = useState<ServicoData>({
        nome: '',
        descricao: '',
        preco: 0,
        duracao_minutos: 0
    });
    const [mensagem, setMensagem] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setServico(prev => ({
            ...prev,
            [name]: name === 'preco' || name === 'duracao_minutos' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validações básicas
        if (!servico.nome.trim()) {
            setMensagem('O nome do serviço é obrigatório');
            return;
        }
        if (servico.preco <= 0) {
            setMensagem('O preço deve ser maior que zero');
            return;
        }
        if (servico.duracao_minutos <= 0) {
            setMensagem('A duração deve ser maior que zero');
            return;
        }

        const servicoData: CreateServicoRequest = {
            nome: servico.nome.trim(),
            descricao: servico.descricao.trim(),
            preco: servico.preco,
            duracao_minutos: servico.duracao_minutos
        };

        await createServico(servicoData);
        
        // Se não houve erro, redirecionar para a lista
        if (!error) {
            navigate('/servicos');
        }
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Novo Serviço</h2>
                <Link to="/servicos" className="btn btn-outline-secondary">
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
                    Erro ao criar serviço: {error}
                </div>
            )}

            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações do Serviço</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nome"
                                value={servico.nome}
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
                                value={servico.preco}
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
                                value={servico.descricao}
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Duração (minutos)</label>
                            <input
                                type="number"
                                className="form-control"
                                name="duracao_minutos"
                                value={servico.duracao_minutos}
                                onChange={handleChange}
                                min="1"
                                placeholder="Ex: 60 para 1 hora"
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
                                        Registrar Serviço
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