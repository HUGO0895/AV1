import Entrada from "../models/entrada-saida/io";
import Relatorio from "../models/relatorios/relatorio";

export default class AppRelatorio{
    private entrada = new Entrada();
    private relatorio:Relatorio= new Relatorio()
     public async  GerarRelatorio(){ // LADRAO DE MORANGOS
    const id=this.entrada.receberTexto("Digite um ID de AERONAVE valido:")
    const dataentrega=this.entrada.receberTexto("Digite uma data de entrega no formato dia/mes/ano:")
    const cliente=this.entrada.receberTexto("Digite um cliente:")
    await this.relatorio.gerarRelatorio(id,dataentrega,cliente)
  }
}