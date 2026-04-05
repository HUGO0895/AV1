import { StatusPecas, TiposPecas } from "./typePecas"
import fs from 'fs'
export default class Pecas{
    public name:string
    public tipo:TiposPecas
    public fornecedor:string
    public status:StatusPecas
    constructor(name:string,tipo:TiposPecas,fornecedor:string,status:StatusPecas){
        this.name=name,
        this.tipo=tipo,
        this.fornecedor=fornecedor,
        this.status=status
    }

    public atualizar_status(status:StatusPecas){
        this.status=status;
    }
    public mostrarP(){
        return this.name+" "+"(Fornecedor: "+this.fornecedor+", "+"Tipo: "+this.tipo+")";
    }

}