import DocumentoDeIdentidade from "./documento";

export default class CPF extends DocumentoDeIdentidade {
    constructor(valor: string, dataEmissao: Date|undefined) {
        super(valor, dataEmissao);
    }

    public descrever(): string {
        return super.descrever("CPF");
    }
}