import React from 'react';
import { Link } from 'react-router-dom';

export default function VendaList() {
    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Vendas</h2>
                <Link to="/vendas/nova" className="btn btn-success">
                    <i className="bi bi-plus-lg me-2"></i>
                    Nova Venda
                </Link>
            </div>

            <div className="alert alert-info">
                <h5>Funcionalidade de Vendas</h5>
                <p className="mb-0">
                    A funcionalidade de vendas ainda não foi implementada no backend. 
                    Esta página será atualizada quando os endpoints de vendas estiverem disponíveis.
                </p>
            </div>

            <div className="card">
                <div className="card-header bg-light">
                    <h6 className="mb-0">Funcionalidades Planejadas</h6>
                </div>
                <div className="card-body">
                    <ul className="mb-0">
                        <li>Registro de vendas de produtos</li>
                        <li>Registro de serviços realizados</li>
                        <li>Histórico de transações por cliente</li>
                        <li>Relatórios de vendas</li>
                        <li>Controle de estoque automático</li>
                    </ul>
                </div>
            </div>
        </div>
    );
} 