import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ClienteData {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    cpf: string;
    dataCadastro: string;
    observacoes: string;
}

export default function ClienteList() {
    const [clientes, setClientes] = useState<ClienteData[]>([]);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [busca, setBusca] = useState('');

    useEffect(() => {
        fetch('/clientes.json')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar os dados dos clientes');
                return res.json();
            })
            .then((data: ClienteData[]) => setClientes(data))
            .catch((err) => setMensagem(`Erro: ${err.message}`))
            .finally(() => setLoading(false));
    }, []);

    const clientesFiltrados = clientes.filter(cliente => 
        cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
        cliente.email.toLowerCase().includes(busca.toLowerCase()) ||
        cliente.cpf.includes(busca) ||
        cliente.telefone.includes(busca)
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

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Clientes</h2>
                <Link to="/clientes/novo" className="btn btn-success">
                    <i className="bi bi-plus-circle me-2"></i>
                    Novo Cliente
                </Link>
            </div>

            {mensagem && (
                <div className="alert alert-warning" role="alert">
                    {mensagem}
                </div>
            )}

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por nome, e-mail, CPF ou telefone..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {clientesFiltrados.map((cliente) => (
                    <div key={cliente.id} className="col">
                        <div className="card h-100 shadow-sm">
                            <div className="card-header bg-success text-white">
                                <h5 className="card-title mb-0">{cliente.nome}</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    <strong>E-mail:</strong> {cliente.email}
                                </p>
                                <p className="card-text">
                                    <strong>Telefone:</strong> {cliente.telefone}
                                </p>
                                <p className="card-text">
                                    <strong>CPF:</strong> {cliente.cpf}
                                </p>
                                <p className="card-text">
                                    <strong>Data de Cadastro:</strong> {cliente.dataCadastro}
                                </p>
                                {cliente.observacoes && (
                                    <p className="card-text">
                                        <strong>Observações:</strong> {cliente.observacoes}
                                    </p>
                                )}
                            </div>
                            <div className="card-footer bg-transparent">
                                <Link
                                    to={`/clientes/${cliente.id}`}
                                    className="btn btn-outline-primary w-100"
                                >
                                    <i className="bi bi-eye me-2"></i>
                                    Ver Detalhes
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {clientesFiltrados.length === 0 && (
                <div className="alert alert-info" role="alert">
                    Nenhum cliente encontrado com os critérios de busca.
                </div>
            )}
        </div>
    );
} 