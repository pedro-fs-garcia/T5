import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface ServicoData {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    duracao: string;
    categoria: string;
}

export default function ServicoDetalhes() {
    const { id } = useParams<{ id: string }>();
    const [servico, setServico] = useState<ServicoData | null>(null);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        fetch('/servicos.json')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar os dados do serviço');
                return res.json();
            })
            .then((data: ServicoData[]) => {
                const servicoEncontrado = data.find(s => s.id === Number(id));
                if (servicoEncontrado) {
                    setServico(servicoEncontrado);
                } else {
                    setMensagem('Serviço não encontrado');
                }
            })
            .catch((err) => setMensagem(`Erro: ${err.message}`))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!servico) return;
        
        const { name, value } = e.target;
        setServico(prev => {
            if (!prev) return null;
            return {
                ...prev,
                [name]: name === 'preco' ? parseFloat(value) : value
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
        name: keyof ServicoData,
        type: 'text' | 'number' | 'textarea' = 'text'
    ) => (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            {editando ? (
                type === 'textarea' ? (
                    <textarea
                        className="form-control"
                        name={name}
                        value={servico?.[name] || ''}
                        onChange={handleChange}
                        rows={3}
                    />
                ) : (
                    <input
                        type={type}
                        className="form-control"
                        name={name}
                        value={servico?.[name] || ''}
                        onChange={handleChange}
                    />
                )
            ) : (
                <p className="form-control-plaintext">
                    {name === 'preco' 
                        ? `R$ ${(servico?.[name] || 0).toFixed(2)}`
                        : servico?.[name] || ''}
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

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Detalhes do Serviço</h2>
                <div>
                    <Link to="/servicos" className="btn btn-outline-secondary me-2">
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
                    <h5 className="mb-0">Informações do Serviço</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {renderField('Nome', 'nome')}
                        {renderField('Preço', 'preco', 'number')}
                        {renderField('Descrição', 'descricao', 'textarea')}
                        {renderField('Duração', 'duracao')}
                        {renderField('Categoria', 'categoria')}
                    </form>
                </div>
            </div>
        </div>
    );
} 