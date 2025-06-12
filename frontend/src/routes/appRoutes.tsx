import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage";
import ClienteList from "../pages/clientes/ClienteList";
import ClienteForm from "../pages/clientes/ClienteForm";
import PetList from "../pages/pets/PetList";
import PetForm from "../pages/pets/PetForm";
import ProdutoList from "../pages/produtos/ProdutoList";
import ProdutoForm from "../pages/produtos/ProdutoForm";
import ServicoList from "../pages/servicos/ServicoList";
import RegistroVenda from "../pages/vendas/RegistroVenda";
import VendasList from "../pages/vendas/VendasList";
import ClienteDetalhes from "../pages/clientes/ClienteDetalhes";
import DetalheVenda from "../pages/vendas/DetalheVenda";
import DetalhesPet from "../pages/pets/DetalhePet";
import ProdutoDetalhes from "../pages/produtos/ProdutoDetalhes";
import RegistroServico from "../pages/servicos/RegistroServico";
import ServicoDetalhes from "../pages/servicos/ServicoDetalhes";
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Rotas de Clientes */}
            <Route path="/clientes" element={<ClienteList />} />
            <Route path="/clientes/novo" element={<ClienteForm />} />
            <Route path="/clientes/:id" element={<ClienteDetalhes />} />
            <Route path="/clientes/:id/editar" element={<ClienteForm />} />

            {/* Rotas de Pets */}
            <Route path="/pets" element={<PetList />} />
            <Route path="/pets/novo" element={<PetForm />} />
            <Route path="/pets/:id" element={< DetalhesPet />} />
            <Route path="/pets/:id/editar" element={<DetalhesPet />} />

            {/* Rotas de Produtos */}
            <Route path="/produtos" element={<ProdutoList />} />
            <Route path="/produtos/novo" element={<ProdutoForm />} />
            <Route path="/produtos/:id" element={<ProdutoDetalhes />} />
            <Route path="/produtos/:id/editar" element={<ProdutoDetalhes />} />

            {/* Rotas de Serviços */}
            <Route path="/servicos" element={<ServicoList />} />
            <Route path="/servicos/novo" element={<RegistroServico />} />
            <Route path="/servicos/:id" element={<ServicoDetalhes />} />
            <Route path="/servicos/:id/editar" element={<ServicoDetalhes />} />

            {/* rotas de vendas */}
            <Route path="/vendas" element={<VendasList />} />
            <Route path="/vendas/novo" element={<RegistroVenda />} />
            <Route path="/vendas/:id" element={<DetalheVenda editar='false' />} />
            <Route path="/vendas/:id/editar" element={<DetalheVenda editar='true' />} />
        </Routes >
    );
}