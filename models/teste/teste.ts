import { Resultado, TipoTeste } from "./enumsTeste";

export default class Teste{
    public tipo:TipoTeste
    public resultado:Resultado
    constructor(tipo:TipoTeste,resultado:Resultado){
        this.tipo=tipo
        this.resultado=resultado

    }
    public mostarTeste(){
        return "Tipo: "+this.tipo+" "+"Resultado: "+this.resultado
    }
}