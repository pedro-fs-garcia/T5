import Cliente from "../models/cliente";
import CPF from "../models/cpf";
import Pet from "../models/pet";
import Produto from "../models/produto";
import Servico from "../models/servico";
import Telefone from "../models/telefone";

const mockCliente = new Cliente(
    "João Silva",
    "João",
    new CPF("123.456.789-00", new Date("12-12-1997")),
    new CPF("12.345.567-09", new Date("12-12-1997")),
    new Date("2023-01-15"),
    [
        new Telefone ("12", "99999-9999")
    ],
    "joao.silva@email.com",
    [
        new Produto(1, "Ração Premium", 89.9, 23 ),
        new Produto(2, "Brinquedo para Gatos", 29.9, 15),
        new Produto(3, "Coleira Personalizada", 45.5, 10),
    ],
    [
        new Servico (1, "Banho e Tosa", 70.0),
        new Servico(2, "Consulta Veterinária", 150.0),
    ],
    [
        new Pet ("Rex", "Golden Retriever", "Macho", "Cachorro"),
        new Pet("Luna", "Siamês", "Fêmea", "Gato"),
    ],
);

export function getCliente(idCliente:number) {
    return mockCliente;
}