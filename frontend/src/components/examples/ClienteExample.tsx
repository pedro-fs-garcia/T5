import React, { useEffect, useState } from 'react';
import { useClientes, useCreateCliente, useUpdateCliente, useDeleteCliente } from '../../hooks';
import { Cliente, CreateClienteRequest, UpdateClienteRequest } from '../../types/api';
import { formatDate, isValidEmail } from '../../utils/apiUtils';

export const ClienteExample: React.FC = () => {
    const [formData, setFormData] = useState<CreateClienteRequest>({
        nome: '',
        nome_social: '',
        email: ''
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    // Hooks for API operations
    const { data: clientes, loading: loadingClientes, error: errorClientes, execute: fetchClientes } = useClientes();
    const { loading: creating, error: createError, execute: createCliente } = useCreateCliente();
    const { loading: updating, error: updateError, execute: updateCliente } = useUpdateCliente();
    const { loading: deleting, error: deleteError, execute: deleteCliente } = useDeleteCliente();

    // Load clientes on component mount
    useEffect(() => {
        fetchClientes();
    }, [fetchClientes]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isValidEmail(formData.email)) {
            alert('Email inválido');
            return;
        }

        if (editingId) {
            // Update existing cliente
            await updateCliente(editingId, formData as UpdateClienteRequest);
            setEditingId(null);
        } else {
            // Create new cliente
            await createCliente(formData);
        }

        // Reset form and refresh list
        setFormData({ nome: '', nome_social: '', email: '' });
        fetchClientes();
    };

    const handleEdit = (cliente: Cliente) => {
        setEditingId(cliente.id);
        setFormData({
            nome: cliente.nome,
            nome_social: cliente.nome_social || '',
            email: cliente.email
        });
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
            await deleteCliente(id);
            fetchClientes();
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ nome: '', nome_social: '', email: '' });
    };

    if (loadingClientes) {
        return <div>Carregando clientes...</div>;
    }

    if (errorClientes) {
        return <div>Erro ao carregar clientes: {errorClientes}</div>;
    }

    return (
        <div className="cliente-example">
            <h2>Gerenciamento de Clientes</h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="cliente-form">
                <h3>{editingId ? 'Editar Cliente' : 'Novo Cliente'}</h3>
                
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label>Nome Social:</label>
                    <input
                        type="text"
                        value={formData.nome_social}
                        onChange={(e) => setFormData({ ...formData, nome_social: e.target.value })}
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={creating || updating}>
                        {creating || updating ? 'Salvando...' : (editingId ? 'Atualizar' : 'Criar')}
                    </button>
                    
                    {editingId && (
                        <button type="button" onClick={handleCancel}>
                            Cancelar
                        </button>
                    )}
                </div>

                {(createError || updateError) && (
                    <div className="error">
                        {createError || updateError}
                    </div>
                )}
            </form>

            {/* List */}
            <div className="cliente-list">
                <h3>Lista de Clientes</h3>
                
                {clientes && clientes.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Nome Social</th>
                                <th>Email</th>
                                <th>Data Cadastro</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.nome_social || '-'}</td>
                                    <td>{cliente.email}</td>
                                    <td>{formatDate(cliente.data_cadastro)}</td>
                                    <td>
                                        <button
                                            onClick={() => handleEdit(cliente)}
                                            disabled={deleting}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cliente.id)}
                                            disabled={deleting}
                                        >
                                            {deleting ? 'Excluindo...' : 'Excluir'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhum cliente encontrado.</p>
                )}

                {deleteError && (
                    <div className="error">
                        Erro ao excluir: {deleteError}
                    </div>
                )}
            </div>
        </div>
    );
}; 