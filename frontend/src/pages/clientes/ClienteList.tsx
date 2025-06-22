import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useClientes, useDeleteCliente } from '../../hooks';

export default function ClienteList() {
    const [busca, setBusca] = useState("");
    const { data: clientes, loading, error, execute: fetchClientes } = useClientes();
    const { execute: deleteCliente } = useDeleteCliente();

    useEffect(() => {
        fetchClientes();
    }, [fetchClientes]);

    const normalizaTexto = (texto: string) => texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const clientesFiltrados = clientes?.filter((cliente) => {
        const buscaLower = normalizaTexto(busca);

        const nome = normalizaTexto(cliente.nome ?? "");
        const nomeSocial = normalizaTexto(cliente.nome_social ?? "");
        const email = normalizaTexto(cliente.email ?? "");

        return (
            nome.includes(buscaLower) ||
            nomeSocial.includes(buscaLower) ||
            email.includes(buscaLower)
        );
    }) || [];

    const deletarCliente = async (id: number) => {
        const confirmacao = window.confirm("Tem certeza que deseja excluir este cliente?");
        if (!confirmacao) return;

        await deleteCliente(id);
        fetchClientes(); // Recarregar lista após exclusão
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
                    Erro ao carregar clientes: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por nome, nome social ou e-mail..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {clientesFiltrados.length === 0 && (
                <div className="alert alert-info">Nenhum cliente encontrado com os critérios de busca.</div>
            )}

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {clientesFiltrados.map((cliente) => (
                    <div key={cliente.id} className="col">
                        <div className="card h-100 shadow-sm">
                            <div className="card-header bg-success text-white">
                                <h5 className="card-title mb-0">{cliente.id} - {cliente.nome}</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    <strong>Nome Social:</strong> {cliente.nome_social || "Não informado"}
                                </p>
                                <p className="card-text">
                                    <strong>E-mail:</strong> {cliente.email}
                                </p>
                                <p className="card-text">
                                    <strong>Data de Cadastro:</strong> {new Date(cliente.data_cadastro).toLocaleDateString('pt-BR')}
                                </p>
                            </div>
                            <div className="card-footer bg-transparent">
                                <Link to={`/clientes/${cliente.id}`} className="btn btn-outline-primary w-100">
                                    <i className="bi bi-eye me-2"></i>
                                    Ver Detalhes
                                </Link>

                                <button
                                    onClick={() => deletarCliente(cliente.id)}
                                    className="btn btn-outline-danger w-100 mt-2"
                                >
                                    <i className="bi bi-trash me-2"></i>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 