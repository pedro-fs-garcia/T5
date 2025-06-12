import DocumentoDeIdentidade from "./documento";

export default class RG extends DocumentoDeIdentidade {
    constructor(valor: string, dataEmissao?: Date) {
        super(valor, dataEmissao);
    }

    public descrever(): string {
        return super.descrever("RG");
    }
}