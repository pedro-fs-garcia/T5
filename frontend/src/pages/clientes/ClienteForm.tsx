import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registrarNovoCliente } from '../../services/ClienteService';
import { Cliente, Endereco, Telefone } from '../../models/interfaces';


export default function ClienteForm() {
    const [cliente, setCliente] = useState<Cliente>({
        id: 0,
        nome: '',
        nomeSocial: null,
        email: '',
        endereco: {
            id: 0,
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
            numero: '',
            codigoPostal: '',
            informacoesAdicionais: '',
            links: []
        },
        telefones: [
            {
                id: 0,
                ddd: '',
                numero: '',
                links: []
            }
        ],
        links: []
    });

    const [mensagem, setMensagem] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name.startsWith('endereco.')) {
            const field = name.split('.')[1] as keyof Endereco;
            setCliente(prev => ({
                ...prev,
                endereco: {
                    ...prev.endereco,
                    [field]: value
                }
            }));
        } else if (name.startsWith('telefone.')) {
            const field = name.split('.')[1] as keyof Telefone;
            setCliente(prev => ({
                ...prev,
                telefones: [{
                    ...prev.telefones[0],
                    [field]: value
                }]
            }));
        } else {
            setCliente(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { nome, email, telefones } = cliente;
        const telefone = telefones[0];

        if (!nome.trim()) return setMensagem('O nome é obrigatório');
        if (!email || !email.trim()) return setMensagem('O e-mail é obrigatório');
        if (!telefone.ddd || !telefone.numero) return setMensagem('Telefone inválido');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return setMensagem('E-mail inválido');

        // Aqui você adicionaria a chamada para salvar o cliente no backend
        console.log('Cliente a ser salvo:', cliente);
        const resposta = await registrarNovoCliente(cliente);
        console.log(resposta);
        // setMensagem('Cliente registrado com sucesso!');

        // Reset do formulário
        setCliente({
            id: 0,
            nome: '',
            nomeSocial: null,
            email: '',
            endereco: {
                id: 0,
                estado: '',
                cidade: '',
                bairro: '',
                rua: '',
                numero: '',
                codigoPostal: '',
                informacoesAdicionais: '',
                links: []
            },
            telefones: [
                {
                    id: 0,
                    ddd: '',
                    numero: '',
                    links: []
                }
            ],
            links: []
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
                            <label className="form-label">Nome</label>
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
                            <label className="form-label">Nome Social</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nomeSocial"
                                value={cliente.nomeSocial || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">E-mail</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={cliente.email || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* TELEFONE */}
                        <div className="mb-3">
                            <label className="form-label">DDD</label>
                            <input
                                type="text"
                                className="form-control"
                                name="telefone.ddd"
                                value={cliente.telefones[0].ddd}
                                onChange={handleChange}
                                placeholder="11"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Número</label>
                            <input
                                type="text"
                                className="form-control"
                                name="telefone.numero"
                                value={cliente.telefones[0].numero}
                                onChange={handleChange}
                                placeholder="91234-5678"
                                required
                            />
                        </div>

                        {/* ENDEREÇO */}
                        <div className="mb-3">
                            <label className="form-label">Estado</label>
                            <input
                                type="text"
                                className="form-control"
                                name="endereco.estado"
                                value={cliente.endereco.estado}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Cidade</label>
                            <input
                                type="text"
                                className="form-control"
                                name="endereco.cidade"
                                value={cliente.endereco.cidade}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Bairro</label>
                            <input
                                type="text"
                                className="form-control"
                                name="endereco.bairro"
                                value={cliente.endereco.bairro}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Rua</label>
                            <input
                                type="text"
                                className="form-control"
                                name="endereco.rua"
                                value={cliente.endereco.rua}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Número</label>
                            <input
                                type="text"
                                className="form-control"
                                name="endereco.numero"
                                value={cliente.endereco.numero}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Código Postal</label>
                            <input
                                type="text"
                                className="form-control"
                                name="endereco.codigoPostal"
                                value={cliente.endereco.codigoPostal}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Informações Adicionais</label>
                            <textarea
                                className="form-control"
                                name="endereco.informacoesAdicionais"
                                value={cliente.endereco.informacoesAdicionais}
                                onChange={handleChange}
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
