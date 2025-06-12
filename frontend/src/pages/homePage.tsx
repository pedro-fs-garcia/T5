export default function HomePage() {
    return (
        <div className="min-vh-100 bg-light">
            <div className="container py-5">
                {/* Hero Section */}
                <div className="text-center mb-5">
                    <div className="badge bg-primary-subtle text-dark mb-3 p-2">Sistema de Gerenciamento</div>
                    <h1 className="display-4 fw-bold mb-4">
                        Bem-vindo ao <span className="text-primary">C4P PetShop</span>
                    </h1>
                    <p className="lead text-secondary mb-4 mx-auto" style={{ maxWidth: "800px" }}>
                        Sistema moderno de gerenciamento de petshops. Controle facilmente seus clientes, pets, agendamentos,
                        produtos e serviços.
                    </p>

                </div>

                {/* Main Content */}
                <div className="row g-4 mb-5">
                    {/* Cadastros Card */}
                    <div className="col-md-4">
                        <div className="card h-100 border-subtle shadow-sm">
                            <div className="card-header bg-white border-bottom-0 pb-0">
                                <h2 className="card-title  fs-3 d-flex align-items-center">
                                    <i className="bi bi-people me-2"></i>
                                    Listagens
                                </h2>
                                <p className="card-text text-muted">Gerencie todos os cadastros do seu petshop</p>
                            </div>
                            <div className="card-body d-grid gap-3">
                                <a href="/clientes" className="text-decoration-none">
                                    <button className="btn btn-outline-primary w-100 text-start d-flex align-items-center">
                                        <i className="bi bi-people me-2"></i>
                                        <span>Clientes</span>
                                        <i className="bi bi-arrow-right ms-auto opacity-50"></i>
                                    </button>
                                </a>
                                <a href="/pets" className="text-decoration-none">
                                    <button className="btn btn-outline-primary w-100 text-start d-flex align-items-center">
                                        <i className="bi bi-github me-2"></i>
                                        <span>Pets</span>
                                        <i className="bi bi-arrow-right ms-auto opacity-50"></i>
                                    </button>
                                </a>
                                <a href="/produtos" className="text-decoration-none">
                                    <button className="btn btn-outline-primary w-100 text-start d-flex align-items-center">
                                        <i className="bi bi-box-seam me-2"></i>
                                        <span>Produtos</span>
                                        <i className="bi bi-arrow-right ms-auto opacity-50"></i>
                                    </button>
                                </a>
                                <a href="/servicos" className="text-decoration-none">
                                    <button className="btn btn-outline-primary w-100 text-start d-flex align-items-center">
                                        <i className="bi bi-scissors me-2"></i>
                                        <span>Serviços</span>
                                        <i className="bi bi-arrow-right ms-auto opacity-50"></i>
                                    </button>
                                </a>
                            </div>
                            <div className="card-footer bg-white border-top-0">
                                <p className="text-muted small">Acesse e gerencie todos os cadastros do sistema</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card h-100 border-subtle shadow-sm">
                            <div className="card-header bg-white border-bottom-0 pb-0">
                                <h2 className="card-title  fs-3 d-flex align-items-center">
                                    <i className="bi bi-people me-2"></i>
                                    Cadastros
                                </h2>
                                <p className="card-text text-muted">Cadastre novos itens ao seu petshop</p>
                            </div>
                            <div className="card-body d-grid gap-3">
                                <a href="/clientes/novo" className="text-decoration-none">
                                    <button className="btn btn-outline-primary w-100 text-start d-flex align-items-center">
                                        <i className="bi bi-people me-2"></i>
                                        <span>Novo cliente</span>
                                        <i className="bi bi-arrow-right ms-auto opacity-50"></i>
                                    </button>
                                </a>
                                <a href="/pets/novo" className="text-decoration-none">
                                    <button className="btn btn-outline-primary w-100 text-start d-flex align-items-center">
                                        <i className="bi bi-github me-2"></i>
                                        <span>Novo Pet</span>
                                        <i className="bi bi-arrow-right ms-auto opacity-50"></i>
                                    </button>
                                </a>
                                <a href="/produtos/novo" className="text-decoration-none">
                                    <button className="btn btn-outline-primary w-100 text-start d-flex align-items-center">
                                        <i className="bi bi-box-seam me-2"></i>
                                        <span>Novo Produto</span>
                                        <i className="bi bi-arrow-right ms-auto opacity-50"></i>
                                    </button>
                                </a>
                                <a href="/servicos/novo" className="text-decoration-none">
                                    <button className="btn btn-outline-primary w-100 text-start d-flex align-items-center">
                                        <i className="bi bi-scissors me-2"></i>
                                        <span>Novo Serviço</span>
                                        <i className="bi bi-arrow-right ms-auto opacity-50"></i>
                                    </button>
                                </a>
                            </div>
                            <div className="card-footer bg-white border-top-0">
                                <p className="text-muted small">Acesse e gerencie todos os cadastros do sistema</p>
                            </div>
                        </div>
                    </div>

                    {/* Registros Card */}
                    <div className="col-md-4">
                        <div className="card h-100 border-subtle shadow-sm">
                            <div className="card-header bg-white border-bottom-0 pb-0">
                                <h2 className="card-title text-dark fs-3 d-flex align-items-center">
                                    <i className="bi bi-receipt me-2"></i>
                                    Compra e venda
                                </h2>
                                <p className="card-text text-muted">Registre compras e vendas do seu petshop</p>
                            </div>
                            <div className="card-body d-grid gap-3">
                                <a href="/vendas" className="text-decoration-none">
                                    <button className="btn btn-outline-success w-100 text-start d-flex align-items-center">
                                        <i className="bi bi-receipt me-2"></i>
                                        <span>Listagem de Vendas</span>
                                        <i className="bi bi-arrow-right ms-auto opacity-50"></i>
                                    </button>
                                </a>
                                <a href="/vendas/novo" className="text-decoration-none">
                                    <button className="btn btn-outline-success w-100 text-start d-flex align-items-center">
                                        <i className="bi bi-receipt me-2"></i>
                                        <span>Registro de Venda</span>
                                        <i className="bi bi-arrow-right ms-auto opacity-50"></i>
                                    </button>
                                </a>
                            </div>
                            <div className="card-footer bg-white border-top-0">
                                <p className="text-muted small">Registre e acompanhe todas as transações financeiras</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
