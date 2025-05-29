export default class Telefone {
    constructor (
        private ddd: string,
        private numero: string
    ) {}

    public descrever(): string {
        return `(${this.ddd}) ${this.numero}`
    }

    public get getDdd(): string {
        return this.ddd
    }

    public get getNumero(): string {
        return this.numero
    }

    public setDdd(ddd:string) {
        this.ddd = ddd;
    }

    public setNumero(numero:string){
        this.numero = numero;
    }
}