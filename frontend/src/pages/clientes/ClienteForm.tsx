import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateCliente } from '../../hooks';
import { CreateClienteRequest } from '../../types/api';
import { isValidEmail } from '../../utils/apiUtils';

export default function ClienteForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreateClienteRequest>({
        nome: '',
        nome_social: '',
        email: ''
    });

    const { loading, error, execute: createCliente } = useCreateCliente();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { nome, email } = formData;

        if (!nome.trim()) {
            alert('O nome é obrigatório');
            return;
        }

        if (!email || !email.trim()) {
            alert('O e-mail é obrigatório');
            return;
        }

        if (!isValidEmail(email)) {
            alert('E-mail inválido');
            return;
        }

        try {
            await createCliente(formData);
            
            // Reset form
            setFormData({
                nome: '',
                nome_social: '',
                email: ''
            });

            // Navigate to clientes list
            navigate('/clientes');
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
        }
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

            {error && (
                <div className="alert alert-danger" role="alert">
                    Erro ao criar cliente: {error}
                </div>
            )}

            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações do Cliente</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nome *</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                                placeholder="Digite o nome completo"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Nome Social</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nome_social"
                                value={formData.nome_social}
                                onChange={handleChange}
                                placeholder="Digite o nome social (opcional)"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">E-mail *</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Digite o e-mail"
                            />
                        </div>

                        <div className="d-grid">
                            <button 
                                type="submit" 
                                className="btn btn-success"
                                disabled={loading}
                            >
                                <i className="bi bi-save me-2"></i>
                                {loading ? 'Registrando...' : 'Registrar Cliente'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="mt-4">
                <div className="alert alert-info">
                    <h6>Observações:</h6>
                    <ul className="mb-0">
                        <li>Os campos marcados com * são obrigatórios</li>
                        <li>O nome social é opcional</li>
                        <li>O e-mail deve ser válido</li>
                        <li>Telefones e endereços devem ser adicionados posteriormente na edição do cliente</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
