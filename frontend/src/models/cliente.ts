import CPF from "./cpf"
import Pet from "./pet"
import Produto from "./produto"
import RG from "./rg"
import Servico from "./servico"
import Telefone from "./telefone"
import User from "./user"

export default class Cliente extends User {
    private produtosConsumidos: Produto[];
    private servicosConsumidos: Servico[];
    private pets: Pet[];
    private itensConsumidos: number;
    private valorConsumido: number;

    constructor(
        nome: string,
        cpf: CPF,
        rg: RG | null = null,
        dataCadastro: Date = new Date(),
        telefones: Telefone[] = [],
        email: string | null = null,
        produtosConsumidos: Produto[] = [],
        servicosConsumidos: Servico[] = [],
        pets: Pet[] = [],
        itensConsumidos: number = 0,
        valorConsumido: number = 0
    ) {
        super(nome, cpf, rg, dataCadastro, telefones, email);
        this.produtosConsumidos = produtosConsumidos;
        this.servicosConsumidos = servicosConsumidos;
        this.pets = pets;
        this.itensConsumidos = itensConsumidos;
        this.valorConsumido = valorConsumido;
    }
    
    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos
    }
    
    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos
    }
    
    public get getPets(): Array<Pet> {
        return this.pets
    }
    
    public get getItensConsumidos(){
        return this.itensConsumidos;
    }

    public get getValorConsumido(){
        return this.valorConsumido;
    }
    
    public setProdutosConsumidos(produtos: Array<Produto>) {
        this.produtosConsumidos = produtos
    }
    
    public setServicosConsumidos(servicos: Array<Servico>) {
        this.servicosConsumidos = servicos
    }
    
    public setPets(pets: Array<Pet>) {
        this.pets = pets
    }
}