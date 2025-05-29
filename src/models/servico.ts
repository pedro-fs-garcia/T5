export default class Servico {
    private id: number|null;
    private nome: string;
    private preco: number;
    public consumo:number;

    constructor (id:number|null, nome:string, preco:number){
        if (!nome || nome.trim() === '') {
            throw new Error('O nome do serviço não pode ser vazio');
        }
        if (preco < 0) {
            throw new Error('O preço do serviço não pode ser negativo');
        }
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.consumo = 0;
    }

    public descrever(){
        let output = "";
        output += "--------------------------------\n";
        output += `Nome do serviço: ${this.nome}\n`;
        output += `Preço do serviço: ${this.preco}\n`;
        output += `Este serviço foi comprado ${this.consumo} vezes\n`;
        output += "--------------------------------\n";
    }

    public get getId(){
        return this.id;
    }

    public get getNome(){
        return this.nome;
    }

    public get getPreco(){
        return this.preco;
    }

    public registrarCompra(quantidade:number){
        this.consumo += quantidade;
    }

    public setId(id:number|null){
        this.id = id
    }

    public setNome(nome:string){
        this.nome = nome;
    }

    public setpreco(preco:number){
        this.preco = preco;
    }
}