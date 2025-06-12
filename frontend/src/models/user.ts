import CPF from "./cpf";
import RG from "./rg";
import Telefone from "./telefone";

export default class User {
    constructor(
        private nome: string,
        private cpf: CPF,
        private rg: RG | null = null,
        private dataCadastro: Date = new Date(),
        private telefones: Telefone[] = [],
        private email: string | null
    ) {}

    public get getNome(): string {
        return this.nome
    }

    public get getCpf(): CPF {
        return this.cpf
    }
    
    public get getRg(): RG | null {
        return this.rg
    }
    
    public get getDataCadastro(): Date {
        return this.dataCadastro
    }

    public get getTelefones(): Array<Telefone> {
        return this.telefones
    }

    public get getEmail():  string | null {
        return this.email
    }

    public setNome(nome: string) {
        this.nome = nome
    }
    
    
    public setCpf(cpf: CPF) {
        this.cpf = cpf
    }
    
    public setRg(rg: RG) {
        this.rg = rg
    }
    
    public setTelefones(telefones: Array<Telefone>) {
        this.telefones = telefones
    }

    public setEmail(email:string) {
        this.email = email
    }

    public adicionaTelefone(telefone:Telefone){
        this.telefones.push(telefone);
    }
}