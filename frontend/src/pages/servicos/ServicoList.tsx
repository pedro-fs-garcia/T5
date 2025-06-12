import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ServicoData {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    duracao: string;
    categoria: string;
}

export default function ServicosList() {
    const [servicos, setServicos] = useState<ServicoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        fetch('/servicos.json')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar os serviços');
                return res.json();
            })
            .then((data: ServicoData[]) => {
                setServicos(data);
            })
            .catch((err) => setMensagem(`Erro: ${err.message}`))
            .finally(() => setLoading(false));
    }, []);

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
                <div className="alert alert-danger" role="alert">
                    {mensagem}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Serviços</h2>
                <Link to="/servicos/novo" className="btn btn-success">
                    <i className="bi bi-plus-lg me-2"></i>
                    Novo Serviço
                </Link>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {servicos.map((servico) => (
                    <div key={servico.id} className="col">
                        <div className="card h-100 shadow-sm">
                            <div className="card-header bg-success text-white">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">{servico.nome}</h5>
                                    <span className="badge bg-light text-dark">
                                        {servico.categoria}
                                    </span>
                                </div>
                            </div>
                            <div className="card-body">
                                <p className="card-text text-muted mb-3">
                                    {servico.descricao}
                                </p>
                                <div className="mb-3">
                                    <small className="text-muted d-block">
                                        Duração: {servico.duracao}
                                    </small>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="h5 mb-0">
                                        R$ {servico.preco.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <div className="card-footer bg-white border-top-0">
                                <div className="d-flex justify-content-between">
                                    <Link
                                        to={`/servicos/${servico.id}`}
                                        className="btn btn-outline-success btn-sm"
                                    >
                                        <i className="bi bi-eye me-1"></i>
                                        Detalhes
                                    </Link>
                                    <Link
                                        to={`/servicos/${servico.id}/editar`}
                                        className="btn btn-outline-secondary btn-sm"
                                    >
                                        <i className="bi bi-pencil me-1"></i>
                                        Editar
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 