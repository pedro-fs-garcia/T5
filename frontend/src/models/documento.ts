export default class DocumentoDeIdentidade {
    constructor (
        private valor: string,
        private dataEmissao?: Date
    ) {}

    public descrever(nomeDocumento:string) {
        return `${nomeDocumento}: ${this.valor} -- Data de Emissão: ${this.dataEmissao}\n`
    }

    public get getValor(): string {
        return this.valor;
    }

    public get getDataEmissao(): Date|undefined {
        return this.dataEmissao;
    }

    public setValor (valor:string) {
        this.valor = valor;
    }

    public setDataEmissao (dataEmissao:Date) {
        this.dataEmissao = dataEmissao;
    }
}