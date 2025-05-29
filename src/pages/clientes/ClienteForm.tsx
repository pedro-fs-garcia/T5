import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ClienteData {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    cpf: string;
    observacoes: string;
}

export default function ClienteForm() {
    const [cliente, setCliente] = useState<ClienteData>({
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        cpf: '',
        observacoes: ''
    });
    const [mensagem, setMensagem] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCliente(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validações básicas
        if (!cliente.nome.trim()) {
            setMensagem('O nome do cliente é obrigatório');
            return;
        }
        if (!cliente.email.trim()) {
            setMensagem('O e-mail do cliente é obrigatório');
            return;
        }
        if (!cliente.telefone.trim()) {
            setMensagem('O telefone do cliente é obrigatório');
            return;
        }
        if (!cliente.cpf.trim()) {
            setMensagem('O CPF do cliente é obrigatório');
            return;
        }

        // Validação de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cliente.email)) {
            setMensagem('E-mail inválido');
            return;
        }

        // Validação de CPF (formato básico)
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(cliente.cpf)) {
            setMensagem('CPF inválido. Use o formato: 000.000.000-00');
            return;
        }

        // Validação de telefone (formato básico)
        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (!telefoneRegex.test(cliente.telefone)) {
            setMensagem('Telefone inválido. Use o formato: (00) 00000-0000');
            return;
        }

        // Aqui você implementaria a lógica para salvar o cliente
        setMensagem('Cliente registrado com sucesso!');
        setCliente({
            nome: '',
            email: '',
            telefone: '',
            endereco: '',
            cpf: '',
            observacoes: ''
        });
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Registrar Novo Cliente</h2>
                <Link to="/clientes" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar
                </Link>
            </div>

            {mensagem && (
                <div className="alert alert-success" role="alert">
                    {mensagem}
                </div>
            )}

            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações do Cliente</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nome Completo</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nome"
                                value={cliente.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">E-mail</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={cliente.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Telefone</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="telefone"
                                value={cliente.telefone}
                                onChange={handleChange}
                                placeholder="(00) 00000-0000"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">CPF</label>
                            <input
                                type="text"
                                className="form-control"
                                name="cpf"
                                value={cliente.cpf}
                                onChange={handleChange}
                                placeholder="000.000.000-00"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Endereço</label>
                            <input
                                type="text"
                                className="form-control"
                                name="endereco"
                                value={cliente.endereco}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Observações</label>
                            <textarea
                                className="form-control"
                                name="observacoes"
                                value={cliente.observacoes}
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-success">
                                <i className="bi bi-save me-2"></i>
                                Registrar Cliente
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 