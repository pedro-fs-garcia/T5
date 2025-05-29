import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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

export default function ClienteDetalhes() {
    const { id } = useParams<{ id: string }>();
    const [cliente, setCliente] = useState<ClienteData | null>(null);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        fetch('/clientes.json')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar os dados do cliente');
                return res.json();
            })
            .then((data: ClienteData[]) => {
                const clienteEncontrado = data.find(c => c.id === Number(id));
                if (clienteEncontrado) {
                    setCliente(clienteEncontrado);
                } else {
                    setMensagem('Cliente não encontrado');
                }
            })
            .catch((err) => setMensagem(`Erro: ${err.message}`))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!cliente) return;
        
        const { name, value } = e.target;
        setCliente(prev => {
            if (!prev) return null;
            return {
                ...prev,
                [name]: value
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
        name: keyof ClienteData,
        type: 'text' | 'email' | 'tel' | 'textarea' = 'text'
    ) => (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            {editando ? (
                type === 'textarea' ? (
                    <textarea
                        className="form-control"
                        name={name}
                        value={cliente?.[name] || ''}
                        onChange={handleChange}
                        rows={3}
                    />
                ) : (
                    <input
                        type={type}
                        className="form-control"
                        name={name}
                        value={cliente?.[name] || ''}
                        onChange={handleChange}
                    />
                )
            ) : (
                <p className="form-control-plaintext">{cliente?.[name] || ''}</p>
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
                <Link to="/clientes" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar para Clientes
                </Link>
            </div>
        );
    }

    if (!cliente) {
        return (
            <div className="container py-4">
                <div className="alert alert-warning" role="alert">
                    Cliente não encontrado
                </div>
                <Link to="/clientes" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar para Clientes
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Detalhes do Cliente</h2>
                <div>
                    <Link to="/clientes" className="btn btn-outline-secondary me-2">
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
                    <h5 className="mb-0">Informações do Cliente</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {renderField('Nome', 'nome')}
                        {renderField('E-mail', 'email', 'email')}
                        {renderField('Telefone', 'telefone', 'tel')}
                        {renderField('CPF', 'cpf')}
                        {renderField('Endereço', 'endereco')}
                        {renderField('Data de Cadastro', 'dataCadastro')}
                        {renderField('Observações', 'observacoes', 'textarea')}
                    </form>
                </div>
            </div>
        </div>
    );
} 
