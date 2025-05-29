import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-dark text-white py-3">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <Link to="/" className="navbar-brand">
                        C4P PetShop
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/clientes" className="nav-link">Clientes</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/pets" className="nav-link">Pets</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/produtos" className="nav-link">Produtos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/servicos" className="nav-link">Serviços</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Registros
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/compras" className="dropdown-item">Compras</Link></li>
                                    <li><Link to="/vendas" className="dropdown-item">Vendas</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
}
