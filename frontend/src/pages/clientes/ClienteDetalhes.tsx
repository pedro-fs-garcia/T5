import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCliente, useUpdateCliente } from '../../hooks';
// import { UpdateClienteRequest } from '../../types/api';
import { formatDate, formatPhone } from '../../utils/apiUtils';
import { telefoneService, enderecoService, documentoService, petService } from '../../services';

export default function ClienteDetalhes() {
    const { id } = useParams<{ id: string }>();
    const [editando, setEditando] = useState(false);
    const [formData, setFormData] = useState<any>({
        nome: '',
        nome_social: '',
        email: '',
        telefones: [],
        enderecos: [],
        documentos: [],
        pets: []
    });

    // Estados temporários para campos vazios
    const [tempTelefone, setTempTelefone] = useState({ ddd: '', numero: '' });
    const [tempEndereco, setTempEndereco] = useState({ rua: '', numero: '', bairro: '', cidade: '', estado: '', cep: '', complemento: '' });
    const [tempDocumento, setTempDocumento] = useState({ tipo: 'CPF' as 'CPF' | 'RG', valor: '' });
    const [tempPet, setTempPet] = useState({ nome: '', raca: '', genero: 'M' as 'M' | 'F', tipo: '' });

    const { data: cliente, loading, error, execute: fetchCliente } = useCliente();
    const { loading: updating, error: updateError, execute: updateCliente } = useUpdateCliente();

    useEffect(() => {
        if (id) {
            fetchCliente(Number(id));
        }
    }, [id, fetchCliente]);

    useEffect(() => {
        if (cliente) {
            setFormData({
                nome: cliente.nome,
                nome_social: cliente.nome_social || '',
                email: cliente.email,
                telefones: cliente.telefones ? [...cliente.telefones] : [],
                enderecos: cliente.enderecos ? [...cliente.enderecos] : [],
                documentos: cliente.documentos ? [...cliente.documentos] : [],
                pets: cliente.pets ? [...cliente.pets] : []
            });
        }
    }, [cliente]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev:any) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            try {
                console.log('Iniciando salvamento dos dados...');
                console.log('FormData:', formData);
                console.log('Cliente original:', cliente);

                // 1. Atualizar dados básicos do cliente
                console.log('Atualizando dados básicos do cliente...');
                await updateCliente(Number(id), {
                    nome: formData.nome,
                    nome_social: formData.nome_social,
                    email: formData.email
                });

                // 2. Gerenciar telefones
                console.log('Gerenciando telefones...', formData.telefones);
                
                // Identificar telefones que foram removidos
                const telefonesRemovidos = cliente?.telefones?.filter(original => 
                    !formData.telefones.some((atual: any) => atual.id === original.id)
                ) || [];
                
                console.log('Telefones removidos:', telefonesRemovidos);
                
                // Excluir telefones removidos
                for (const telefone of telefonesRemovidos) {
                    console.log('Excluindo telefone:', telefone);
                    const result = await telefoneService.delete(telefone.id);
                    console.log('Resultado exclusão telefone:', result);
                }

                // Criar/atualizar telefones
                for (const telefone of formData.telefones) {
                    if (telefone.id) {
                        console.log('Atualizando telefone existente:', telefone);
                        const result = await telefoneService.update(telefone.id, {
                            ddd: telefone.ddd,
                            numero: telefone.numero
                        });
                        console.log('Resultado atualização telefone:', result);
                    } else {
                        console.log('Criando novo telefone:', telefone);
                        const result = await telefoneService.create({
                            cliente_id: Number(id),
                            ddd: telefone.ddd,
                            numero: telefone.numero
                        });
                        console.log('Resultado criação telefone:', result);
                    }
                }

                // 3. Gerenciar endereços
                console.log('Gerenciando endereços...', formData.enderecos);
                
                // Identificar endereços que foram removidos
                const enderecosRemovidos = cliente?.enderecos?.filter(original => 
                    !formData.enderecos.some((atual: any) => atual.id === original.id)
                ) || [];
                
                console.log('Endereços removidos:', enderecosRemovidos);
                
                // Excluir endereços removidos
                for (const endereco of enderecosRemovidos) {
                    console.log('Excluindo endereço:', endereco);
                    const result = await enderecoService.delete(endereco.id);
                    console.log('Resultado exclusão endereço:', result);
                }

                // Criar/atualizar endereços
                for (const endereco of formData.enderecos) {
                    if (endereco.id) {
                        console.log('Atualizando endereço existente:', endereco);
                        const result = await enderecoService.update(endereco.id, {
                            estado: endereco.estado,
                            cidade: endereco.cidade,
                            bairro: endereco.bairro,
                            rua: endereco.rua,
                            numero: endereco.numero,
                            complemento: endereco.complemento,
                            cep: endereco.cep
                        });
                        console.log('Resultado atualização endereço:', result);
                    } else {
                        console.log('Criando novo endereço:', endereco);
                        const result = await enderecoService.create({
                            cliente_id: Number(id),
                            estado: endereco.estado,
                            cidade: endereco.cidade,
                            bairro: endereco.bairro,
                            rua: endereco.rua,
                            numero: endereco.numero,
                            complemento: endereco.complemento,
                            cep: endereco.cep
                        });
                        console.log('Resultado criação endereço:', result);
                    }
                }

                // 4. Gerenciar documentos
                console.log('Gerenciando documentos...', formData.documentos);
                
                // Identificar documentos que foram removidos
                const documentosRemovidos = cliente?.documentos?.filter(original => 
                    !formData.documentos.some((atual: any) => atual.id === original.id)
                ) || [];
                
                console.log('Documentos removidos:', documentosRemovidos);
                
                // Excluir documentos removidos
                for (const documento of documentosRemovidos) {
                    console.log('Excluindo documento:', documento);
                    const result = await documentoService.delete(documento.id);
                    console.log('Resultado exclusão documento:', result);
                }

                // Criar/atualizar documentos
                for (const documento of formData.documentos) {
                    if (documento.id) {
                        console.log('Atualizando documento existente:', documento);
                        const result = await documentoService.update(documento.id, {
                            tipo: documento.tipo,
                            valor: documento.valor
                        });
                        console.log('Resultado atualização documento:', result);
                    } else {
                        console.log('Criando novo documento:', documento);
                        const result = await documentoService.create({
                            cliente_id: Number(id),
                            tipo: documento.tipo,
                            valor: documento.valor
                        });
                        console.log('Resultado criação documento:', result);
                    }
                }

                // 5. Gerenciar pets
                console.log('Gerenciando pets...', formData.pets);
                
                // Identificar pets que foram removidos
                const petsRemovidos = cliente?.pets?.filter(original => 
                    !formData.pets.some((atual: any) => atual.id === original.id)
                ) || [];
                
                console.log('Pets removidos:', petsRemovidos);
                
                // Excluir pets removidos
                for (const pet of petsRemovidos) {
                    console.log('Excluindo pet:', pet);
                    const result = await petService.delete(pet.id);
                    console.log('Resultado exclusão pet:', result);
                }

                // Criar/atualizar pets
                for (const pet of formData.pets) {
                    if (pet.id) {
                        console.log('Atualizando pet existente:', pet);
                        const result = await petService.update(pet.id, {
                            nome: pet.nome,
                            raca: pet.raca,
                            genero: pet.genero,
                            tipo: pet.tipo
                        });
                        console.log('Resultado atualização pet:', result);
                    } else {
                        console.log('Criando novo pet:', pet);
                        const result = await petService.create({
                            cliente_id: Number(id),
                            nome: pet.nome,
                            raca: pet.raca,
                            genero: pet.genero,
                            tipo: pet.tipo
                        });
                        console.log('Resultado criação pet:', result);
                    }
                }

                console.log('Salvamento concluído com sucesso!');
                setEditando(false);
                fetchCliente(Number(id)); // Recarregar dados
            } catch (error) {
                console.error('Erro ao salvar dados:', error);
                alert(`Erro ao salvar dados: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
            }
        }
    };

    // Funções auxiliares para campos dinâmicos
    const handleArrayChange = (field: string, idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => {
            const arr = [...prev[field]];
            arr[idx] = { ...arr[idx], [name]: value };
            return { ...prev, [field]: arr };
        });
    };
    
    const handleAddItem = (field: string, emptyObj: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: [...prev[field], emptyObj] }));
    };
    
    const handleRemoveItem = (field: string, idx: number) => {
        const item = formData[field][idx];
        const itemName = field === 'telefones' ? 'telefone' : 
                        field === 'enderecos' ? 'endereço' : 
                        field === 'documentos' ? 'documento' : 'pet';
        
        if (confirm(`Tem certeza que deseja remover este ${itemName}?`)) {
            console.log(`Removendo ${itemName} do estado local:`, item);
            setFormData((prev: any) => {
                const arr = [...prev[field]];
                arr.splice(idx, 1);
                return { ...prev, [field]: arr };
            });
        }
    };

    // Funções para adicionar itens dos campos temporários
    const handleAddTelefone = () => {
        if (tempTelefone.ddd || tempTelefone.numero) {
            handleAddItem('telefones', { ...tempTelefone });
            setTempTelefone({ ddd: '', numero: '' });
        }
    };

    const handleAddEndereco = () => {
        if (tempEndereco.rua || tempEndereco.numero || tempEndereco.bairro || tempEndereco.cidade || tempEndereco.estado || tempEndereco.cep) {
            handleAddItem('enderecos', { ...tempEndereco });
            setTempEndereco({ rua: '', numero: '', bairro: '', cidade: '', estado: '', cep: '', complemento: '' });
        }
    };

    const handleAddDocumento = () => {
        if (tempDocumento.tipo || tempDocumento.valor) {
            handleAddItem('documentos', { ...tempDocumento });
            setTempDocumento({ tipo: 'CPF', valor: '' });
        }
    };

    const handleAddPet = () => {
        if (tempPet.nome || tempPet.raca || tempPet.tipo) {
            handleAddItem('pets', { ...tempPet });
            setTempPet({ nome: '', raca: '', genero: 'M', tipo: '' });
        }
    };

    // Funções para adicionar novos campos vazios (quando já existem itens)
    const handleAddNewTelefone = () => {
        handleAddItem('telefones', { ddd: '', numero: '' });
    };

    const handleAddNewEndereco = () => {
        handleAddItem('enderecos', { rua: '', numero: '', bairro: '', cidade: '', estado: '', cep: '', complemento: '' });
    };

    const handleAddNewDocumento = () => {
        handleAddItem('documentos', { tipo: 'CPF', valor: '' });
    };

    const handleAddNewPet = () => {
        handleAddItem('pets', { nome: '', raca: '', genero: 'M', tipo: '' });
    };

    const renderInput = (
        label: string,
        name: string,
        value: string,
        type: 'text' | 'email' = 'text'
    ) => (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label text-secondary fw-semibold mb-0">{label}</label>
                {!editando && (
                    <span className="badge bg-light text-secondary">Visualização</span>
                )}
            </div>

            {editando ? (
                <input
                    type={type}
                    className="form-control shadow-sm rounded-3"
                    name={name}
                    value={value}
                    onChange={handleChange}
                />
            ) : (
                <div className="form-control-plaintext border p-2 rounded bg-light text-black">
                    {value?.trim() ? value : 'Não informado'}
                </div>
            )}
        </div>
    );

    if (loading) {
        return (
            <div className="container py-4 text-center">
                <div className="spinner-border" role="status" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger">Erro ao carregar cliente: {error}</div>
                <Link to="/clientes" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Voltar para Clientes
                </Link>
            </div>
        );
    }

    if (!cliente) {
        return (
            <div className="container py-4">
                <div className="alert alert-warning">Cliente não encontrado</div>
                <Link to="/clientes" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i> Voltar para Clientes
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
                        <i className="bi bi-arrow-left me-2"></i> Voltar
                    </Link>
                    {editando ? (
                        <button 
                            className="btn btn-primary" 
                            onClick={handleSubmit}
                            disabled={updating}
                        >
                            <i className="bi bi-check me-2" /> 
                            {updating ? 'Salvando...' : 'Salvar'}
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={() => setEditando(true)}>
                            <i className="bi bi-pencil me-2" /> Editar
                        </button>
                    )}
                </div>
            </div>

            {updateError && (
                <div className="alert alert-danger mb-4">
                    Erro ao atualizar cliente: {updateError}
                </div>
            )}

            <div className="card shadow-sm mb-4">
                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Informações do Cliente</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {renderInput('Nome', 'nome', formData.nome || '')}
                        {renderInput('Nome Social', 'nome_social', formData.nome_social || '')}
                        {renderInput('E-mail', 'email', formData.email || '', 'email')}
                        <div className="mb-4">
                            <label className="form-label text-secondary fw-semibold mb-0">Data de Cadastro</label>
                            <div className="form-control-plaintext border p-2 rounded bg-light text-black">
                                {formatDate(cliente.data_cadastro)}
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Telefones */}
            {editando ? (
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-info text-white">
                        <h5 className="mb-0">Telefones</h5>
                    </div>
                    <div className="card-body">
                        {formData.telefones.length === 0 && (
                            <div className="mb-3">
                                <input className="form-control mb-2" name="ddd" placeholder="DDD" value={tempTelefone.ddd} onChange={(e) => setTempTelefone({ ...tempTelefone, ddd: e.target.value })} />
                                <input className="form-control mb-2" name="numero" placeholder="Número" value={tempTelefone.numero} onChange={(e) => setTempTelefone({ ...tempTelefone, numero: e.target.value })} />
                                <button type="button" className="btn btn-success" onClick={handleAddTelefone}>Adicionar Telefone</button>
                            </div>
                        )}
                        {formData.telefones.map((telefone: any, idx: number) => (
                            <div key={idx} className="mb-3 d-flex align-items-end gap-2">
                                <input className="form-control" name="ddd" placeholder="DDD" value={telefone.ddd} onChange={e => handleArrayChange('telefones', idx, e)} />
                                <input className="form-control" name="numero" placeholder="Número" value={telefone.numero} onChange={e => handleArrayChange('telefones', idx, e)} />
                                <button type="button" className="btn btn-danger" onClick={() => handleRemoveItem('telefones', idx)}>-</button>
                                {idx === formData.telefones.length - 1 && (
                                    <button type="button" className="btn btn-success" onClick={() => handleAddNewTelefone()}>+</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                cliente.telefones && (
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-info text-white">
                        <h5 className="mb-0">Telefones</h5>
                    </div>
                    <div className="card-body">
                        {cliente.telefones.map((telefone) => (
                            <div key={telefone.id} className="mb-2">
                                <strong>Telefone:</strong> {formatPhone(telefone.ddd, telefone.numero)}
                            </div>
                        ))}
                    </div>
                </div>
                )
            )}

            {/* Endereços */}
            {editando ? (
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-warning text-dark">
                        <h5 className="mb-0">Endereço</h5>
                    </div>
                    <div className="card-body">
                        {formData.enderecos.length === 0 && (
                            <div className="mb-3">
                                <input className="form-control mb-2" name="rua" placeholder="Rua" value={tempEndereco.rua} onChange={(e) => setTempEndereco({ ...tempEndereco, rua: e.target.value })} />
                                <input className="form-control mb-2" name="numero" placeholder="Número" value={tempEndereco.numero} onChange={(e) => setTempEndereco({ ...tempEndereco, numero: e.target.value })} />
                                <input className="form-control mb-2" name="bairro" placeholder="Bairro" value={tempEndereco.bairro} onChange={(e) => setTempEndereco({ ...tempEndereco, bairro: e.target.value })} />
                                <input className="form-control mb-2" name="cidade" placeholder="Cidade" value={tempEndereco.cidade} onChange={(e) => setTempEndereco({ ...tempEndereco, cidade: e.target.value })} />
                                <input className="form-control mb-2" name="estado" placeholder="Estado" value={tempEndereco.estado} onChange={(e) => setTempEndereco({ ...tempEndereco, estado: e.target.value })} />
                                <input className="form-control mb-2" name="cep" placeholder="CEP" value={tempEndereco.cep} onChange={(e) => setTempEndereco({ ...tempEndereco, cep: e.target.value })} />
                                <input className="form-control mb-2" name="complemento" placeholder="Complemento" value={tempEndereco.complemento} onChange={(e) => setTempEndereco({ ...tempEndereco, complemento: e.target.value })} />
                                <button type="button" className="btn btn-success" onClick={handleAddEndereco}>Adicionar Endereço</button>
                            </div>
                        )}
                        {formData.enderecos.map((endereco: any, idx: number) => (
                            <div key={idx} className="mb-3 d-flex flex-wrap gap-2 align-items-end">
                                <input className="form-control" name="rua" placeholder="Rua" value={endereco.rua} onChange={e => handleArrayChange('enderecos', idx, e)} />
                                <input className="form-control" name="numero" placeholder="Número" value={endereco.numero} onChange={e => handleArrayChange('enderecos', idx, e)} />
                                <input className="form-control" name="bairro" placeholder="Bairro" value={endereco.bairro} onChange={e => handleArrayChange('enderecos', idx, e)} />
                                <input className="form-control" name="cidade" placeholder="Cidade" value={endereco.cidade} onChange={e => handleArrayChange('enderecos', idx, e)} />
                                <input className="form-control" name="estado" placeholder="Estado" value={endereco.estado} onChange={e => handleArrayChange('enderecos', idx, e)} />
                                <input className="form-control" name="cep" placeholder="CEP" value={endereco.cep} onChange={e => handleArrayChange('enderecos', idx, e)} />
                                <input className="form-control" name="complemento" placeholder="Complemento" value={endereco.complemento} onChange={e => handleArrayChange('enderecos', idx, e)} />
                                <button type="button" className="btn btn-danger" onClick={() => handleRemoveItem('enderecos', idx)}>-</button>
                                {idx === formData.enderecos.length - 1 && (
                                    <button type="button" className="btn btn-success" onClick={() => handleAddNewEndereco()}>+</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                cliente.enderecos && (
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-warning text-dark">
                        <h5 className="mb-0">Endereço</h5>
                    </div>
                    <div className="card-body">
                        {cliente.enderecos.map((endereco) => (
                            <div key={endereco.id} className="mb-3">
                                <p className="mb-1">
                                    <strong>Endereço:</strong> {endereco.rua}, {endereco.numero}
                                </p>
                                <p className="mb-1">
                                    <strong>Bairro:</strong> {endereco.bairro}
                                </p>
                                <p className="mb-1">
                                    <strong>Cidade:</strong> {endereco.cidade} - {endereco.estado}
                                </p>
                                <p className="mb-1">
                                    <strong>CEP:</strong> {endereco.cep}
                                </p>
                                {endereco.complemento && (
                                    <p className="mb-1">
                                        <strong>Complemento:</strong> {endereco.complemento}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                )
            )}

            {/* Documentos */}
            {editando ? (
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-secondary text-white">
                        <h5 className="mb-0">Documentos</h5>
                    </div>
                    <div className="card-body">
                        {formData.documentos.length === 0 && (
                            <div className="mb-3">
                                <select className="form-select mb-2" name="tipo" value={tempDocumento.tipo} onChange={(e) => setTempDocumento({ ...tempDocumento, tipo: e.target.value as 'CPF' | 'RG' })}>
                                    <option value="CPF">CPF</option>
                                    <option value="RG">RG</option>
                                </select>
                                <input className="form-control mb-2" name="valor" placeholder="Valor" value={tempDocumento.valor} onChange={(e) => setTempDocumento({ ...tempDocumento, valor: e.target.value })} />
                                <button type="button" className="btn btn-success" onClick={handleAddDocumento}>Adicionar Documento</button>
                            </div>
                        )}
                        {formData.documentos.map((doc: any, idx: number) => (
                            <div key={idx} className="mb-3 d-flex align-items-end gap-2">
                                <select className="form-select" name="tipo" value={doc.tipo} onChange={e => handleArrayChange('documentos', idx, e)}>
                                    <option value="CPF">CPF</option>
                                    <option value="RG">RG</option>
                                </select>
                                <input className="form-control" name="valor" placeholder="Valor" value={doc.valor} onChange={e => handleArrayChange('documentos', idx, e)} />
                                <button type="button" className="btn btn-danger" onClick={() => handleRemoveItem('documentos', idx)}>-</button>
                                {idx === formData.documentos.length - 1 && (
                                    <button type="button" className="btn btn-success" onClick={() => handleAddNewDocumento()}>+</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                cliente.documentos && (
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-secondary text-white">
                            <h5 className="mb-0">Documentos</h5>
                        </div>
                        <div className="card-body">
                            {cliente.documentos.map((doc) => (
                                <div key={doc.id} className="mb-2">
                                    <strong>{doc.tipo}:</strong> {doc.valor}
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}

            {/* Pets */}
            {editando ? (
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Pets</h5>
                    </div>
                    <div className="card-body">
                        {formData.pets.length === 0 && (
                            <div className="mb-3">
                                <input className="form-control mb-2" name="nome" placeholder="Nome" value={tempPet.nome} onChange={(e) => setTempPet({ ...tempPet, nome: e.target.value })} />
                                <input className="form-control mb-2" name="raca" placeholder="Raça" value={tempPet.raca} onChange={(e) => setTempPet({ ...tempPet, raca: e.target.value })} />
                                <select className="form-select mb-2" name="genero" value={tempPet.genero} onChange={(e) => setTempPet({ ...tempPet, genero: e.target.value as 'M' | 'F' })}>
                                    <option value="">Gênero</option>
                                    <option value="M">Macho</option>
                                    <option value="F">Fêmea</option>
                                </select>
                                <input className="form-control mb-2" name="tipo" placeholder="Tipo" value={tempPet.tipo} onChange={(e) => setTempPet({ ...tempPet, tipo: e.target.value })} />
                                <button type="button" className="btn btn-success" onClick={handleAddPet}>Adicionar Pet</button>
                            </div>
                        )}
                        {formData.pets.map((pet: any, idx: number) => (
                            <div key={idx} className="mb-3 d-flex flex-wrap gap-2 align-items-end">
                                <input className="form-control" name="nome" placeholder="Nome" value={pet.nome} onChange={e => handleArrayChange('pets', idx, e)} />
                                <input className="form-control" name="raca" placeholder="Raça" value={pet.raca} onChange={e => handleArrayChange('pets', idx, e)} />
                                <select className="form-select" name="genero" value={pet.genero} onChange={e => handleArrayChange('pets', idx, e)}>
                                    <option value="M">Macho</option>
                                    <option value="F">Fêmea</option>
                                </select>
                                <input className="form-control" name="tipo" placeholder="Tipo" value={pet.tipo} onChange={e => handleArrayChange('pets', idx, e)} />
                                <button type="button" className="btn btn-danger" onClick={() => handleRemoveItem('pets', idx)}>-</button>
                                {idx === formData.pets.length - 1 && (
                                    <button type="button" className="btn btn-success" onClick={() => handleAddNewPet()}>+</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                cliente.pets && (
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Pets</h5>
                    </div>
                    <div className="card-body">
                        {cliente.pets.map((pet) => (
                            <div key={pet.id} className="mb-2">
                                <strong>{pet.nome}</strong> - {pet.raca} ({pet.tipo}, {pet.genero === 'M' ? 'Macho' : 'Fêmea'})
                            </div>
                        ))}
                    </div>
                </div>
                )
            )}
        </div>
    );
}
