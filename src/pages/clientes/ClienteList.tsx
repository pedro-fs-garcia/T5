import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { buscaListaClientes, excluirCliente } from '../../services/ClienteService';
import { ListaClientes } from '../../models/interfaces';



export default function ClienteList() {
    const [clientes, setClientes] = useState<ListaClientes>([]);
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buscaClientes = async () => {
            setLoading(true);
            try {
                const dados = await buscaListaClientes();
                setClientes(dados);
                console.log(dados);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            } finally {
                setLoading(false);
            }
        };

        buscaClientes();
    }, []);

    const normalizaTexto = (texto: string) => texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const clientesFiltrados = clientes.filter((cliente) => {
        const buscaLower = normalizaTexto(busca);

        const nome = normalizaTexto(cliente.nome ?? "");
        const nomeSocial = normalizaTexto(cliente.nomeSocial ?? "");
        const email = normalizaTexto(cliente.email ?? "");
        const telefones = cliente.telefones.map(t => normalizaTexto(t.numero)).join(" ");
        const endereco = cliente.endereco
            ? normalizaTexto(
                `${cliente.endereco.rua} ${cliente.endereco.numero} ${cliente.endereco.bairro} ${cliente.endereco.cidade} ${cliente.endereco.estado} ${cliente.endereco.codigoPostal}`
            )
            : "";

        return (
            nome.includes(buscaLower) ||
            nomeSocial.includes(buscaLower) ||
            email.includes(buscaLower) ||
            telefones.includes(buscaLower) ||
            endereco.includes(buscaLower)
        );
    });


    const deletarCliente = async (id:number) => {
            const confirmacao = window.confirm("Tem certeza que deseja excluir este cliente?");
            if (!confirmacao) return;

            const resultado = await excluirCliente(id);

            if (resultado) {
                window.location.reload(); // recarrega a página após exclusão
            } else {
                alert("Erro ao excluir cliente.");
            }
    }


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
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por nome, nome social, telefone, e-mail ou endereço..."
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
                                <h5 className="card-title mb-0">{cliente.nome ?? "Nome não informado"}</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    <strong>Nome Social:</strong> {cliente.nomeSocial ?? "Não informado"}
                                </p>
                                <p className="card-text">
                                    <strong>E-mail:</strong> {cliente.email ?? "Não informado"}
                                </p>
                                <p className="card-text">
                                    <strong>Telefone(s):</strong><br />
                                    {cliente.telefones && cliente.telefones.length > 0 ? (
                                        cliente.telefones.map((tel) => (
                                            <span key={tel.id}>
                                                ({tel.ddd}) {tel.numero}
                                                <br />
                                            </span>
                                        ))
                                    ) : (
                                        "Nenhum telefone cadastrado"
                                    )}
                                </p>
                                <p className="card-text">
                                    <strong>Endereço:</strong><br />
                                    {cliente.endereco
                                        ? `${cliente.endereco.rua}, ${cliente.endereco.numero} - ${cliente.endereco.bairro}, ${cliente.endereco.cidade} - ${cliente.endereco.estado}, CEP: ${cliente.endereco.codigoPostal}`
                                        : "Endereço não informado"}
                                </p>
                                {cliente.endereco?.informacoesAdicionais && (
                                    <p className="card-text">
                                        <strong>Complemento:</strong> {cliente.endereco.informacoesAdicionais}
                                    </p>
                                )}
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