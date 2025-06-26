import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useServicoById, useUpdateServico } from '../../hooks';
import { UpdateServicoRequest } from '../../types/api';
import { formatCurrency } from '../../utils/apiUtils';

interface ServicoFormData {
    nome: string;
    descricao: string;
    preco: number;
    duracao_minutos: number;
}

export default function ServicoDetalhes() {
    const { id } = useParams<{ id: string }>();
    const { data: servico, loading, error, execute: fetchServico } = useServicoById(id ? parseInt(id) : 0);
    const { execute: updateServico, loading: loadingUpdate, error: errorUpdate } = useUpdateServico();
    
    const [editando, setEditando] = useState(false);
    const [formData, setFormData] = useState<ServicoFormData>({
        nome: '',
        descricao: '',
        preco: 0,
        duracao_minutos: 0
    });
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        if (servico) {
            setFormData({
                nome: servico.nome,
                descricao: servico.descricao || '',
                preco: servico.preco,
                duracao_minutos: servico.duracao_minutos
            });
        }
    }, [servico]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'preco' || name === 'duracao_minutos' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!servico || !id) return;

        // Validações básicas
        if (!formData.nome.trim()) {
            setMensagem('O nome do serviço é obrigatório');
            return;
        }
        if (formData.preco <= 0) {
            setMensagem('O preço deve ser maior que zero');
            return;
        }
        if (formData.duracao_minutos <= 0) {
            setMensagem('A duração deve ser maior que zero');
            return;
        }

        const servicoData: UpdateServicoRequest = {
            nome: formData.nome.trim(),
            descricao: formData.descricao.trim(),
            preco: formData.preco,
            duracao_minutos: formData.duracao_minutos
        };

        await updateServico(parseInt(id), servicoData);
        
        // Se não houve erro, sair do modo de edição
        if (!errorUpdate) {
            setEditando(false);
            setMensagem('Serviço atualizado com sucesso!');
            // Recarregar dados do serviço
            fetchServico(parseInt(id));
        }
    };

    const handleCancel = () => {
        if (servico) {
            setFormData({
                nome: servico.nome,
                descricao: servico.descricao || '',
                preco: servico.preco,
                duracao_minutos: servico.duracao_minutos
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
                    Erro ao carregar serviço: {error}
                </div>
                <Link to="/servicos" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar para Serviços
                </Link>
            </div>
        );
    }

    if (!servico) {
        return (
            <div className="container py-4">
                <div className="alert alert-warning" role="alert">
                    Serviço não encontrado
                </div>
                <Link to="/servicos" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar para Serviços
                </Link>
            </div>
        );
    }

    const renderField = (
        label: string,
        name: keyof ServicoFormData,
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
                        : name === 'duracao_minutos'
                        ? `${formData[name]} minutos`
                        : formData[name] || ''}
                </p>
            )}
        </div>
    );

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Detalhes do Serviço</h2>
                <div>
                    <Link to="/servicos" className="btn btn-outline-secondary me-2">
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
                    Erro ao atualizar serviço: {errorUpdate}
                </div>
            )}

            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações do Serviço</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {renderField('Nome', 'nome')}
                        {renderField('Preço', 'preco', 'number')}
                        {renderField('Descrição', 'descricao', 'textarea')}
                        {renderField('Duração', 'duracao_minutos', 'number')}
                    </form>
                </div>
            </div>
        </div>
    );
} 