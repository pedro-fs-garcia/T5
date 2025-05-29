import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ServicoData {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    duracao: string;
    categoria: string;
}

export default function RegistroServico() {
    const [servico, setServico] = useState<Omit<ServicoData, 'id'>>({
        nome: '',
        preco: 0,
        descricao: '',
        duracao: '',
        categoria: ''
    });
    const [mensagem, setMensagem] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setServico(prev => ({
            ...prev,
            [name]: name === 'preco' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validações básicas
        if (!servico.nome.trim()) {
            setMensagem('O nome do serviço é obrigatório');
            return;
        }
        if (servico.preco <= 0) {
            setMensagem('O preço deve ser maior que zero');
            return;
        }
        if (!servico.duracao.trim()) {
            setMensagem('A duração é obrigatória');
            return;
        }
        if (!servico.categoria.trim()) {
            setMensagem('A categoria é obrigatória');
            return;
        }

        // Aqui você implementaria a lógica para salvar o serviço
        setMensagem('Serviço registrado com sucesso!');
        setServico({
            nome: '',
            preco: 0,
            descricao: '',
            duracao: '',
            categoria: ''
        });
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Novo Serviço</h2>
                <Link to="/servicos" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar
                </Link>
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações do Serviço</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nome"
                                value={servico.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Preço</label>
                            <input
                                type="number"
                                className="form-control"
                                name="preco"
                                value={servico.preco}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Descrição</label>
                            <textarea
                                className="form-control"
                                name="descricao"
                                value={servico.descricao}
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Duração</label>
                            <input
                                type="text"
                                className="form-control"
                                name="duracao"
                                value={servico.duracao}
                                onChange={handleChange}
                                placeholder="Ex: 1 hora, 30 minutos"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Categoria</label>
                            <select
                                className="form-select"
                                name="categoria"
                                value={servico.categoria}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione uma categoria</option>
                                <option value="banho">Banho e Tosa</option>
                                <option value="veterinario">Veterinário</option>
                                <option value="hospedagem">Hospedagem</option>
                                <option value="adestramento">Adestramento</option>
                                <option value="spa">Spa</option>
                            </select>
                        </div>

                        {mensagem && (
                            <div className={`alert ${mensagem.includes('Erro') ? 'alert-danger' : 'alert-success'}`} role="alert">
                                {mensagem}
                            </div>
                        )}

                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-success">
                                <i className="bi bi-check-lg me-2"></i>
                                Registrar Serviço
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 