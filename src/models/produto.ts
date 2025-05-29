export default class Produto {
    private id: number|null;
    private nome: string;
    private preco: number;
    private quantidadeEstoque: number;
    public consumo:number;
    
    constructor (id:number|null, nome:string, preco:number, quantidadeEstoque:number){
        if (!nome || nome.trim() === '') {
            throw new Error('O nome do produto não pode ser vazio');
        }
        if (preco < 0) {
            throw new Error('O preço do produto não pode ser negativo');
        }
        if (quantidadeEstoque < 0) {
            throw new Error('A quantidade em estoque não pode ser negativa');
        }
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.quantidadeEstoque = quantidadeEstoque;
        this.consumo = 0;
    }
    
    public descrever(){
        let output = "";
        output = "--------------------------------\n";
        output += `Nome do produto: ${this.nome}\n`;
        output += `Preco do produto: ${this.preco}\n`;
        output += `Quantidade em estoque: ${this.quantidadeEstoque}\n`;
        output += `Este produto foi comprado ${this.consumo} vezes\n`;
        output += "--------------------------------\n";
        return output;
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

    public get getQuantidadeEstoque(){
        return this.quantidadeEstoque;
    }


    public registrarCompra(quantidade:number){
        if (quantidade > this.quantidadeEstoque) {
            throw new Error('Quantidade insuficiente em estoque');
        }
        this.consumo += quantidade;
        this.quantidadeEstoque -= quantidade;
    }

    public adicionarEstoque(quantidade:number){
        if (quantidade < 0) {
            throw new Error('Não é possível adicionar quantidade negativa ao estoque');
        }
        this.quantidadeEstoque += quantidade;
    }

    public setId(id:number|null){
        this.id = id;
    }

    public setNome(nome:string){
        this.nome = nome;
    }

    public setPreco(preco:number){
        this.preco = preco;
    }

    public setQuantidadeEstoque(quantidade:number){
        if (quantidade < 0) {
            throw new Error('A quantidade em estoque não pode ser negativa');
        }
        this.quantidadeEstoque = quantidade;
    }
}