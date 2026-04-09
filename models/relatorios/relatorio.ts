import path from "node:path";
import Aeronave from "../aeronave/aeronave";
import Pecas from "../pecas/pecas";
import Etapas from "../etapas/etapas";
import Teste from "../teste/teste";
import fs from 'fs/promises'

export default class Relatorio{
     public async gerarRelatorio(id:string,dataentrega:string,cliente:string){
     const aeronavesS = await fs.readFile(
      path.resolve(__dirname, "..",'..', "./database", "aeronaves.json"),
      "utf-8",
    );
    const aeronavesArray = JSON.parse(aeronavesS).find((aeronave)=> aeronave.id==id);
    const aeronave= new Aeronave(aeronavesArray.id,aeronavesArray.modelo,aeronavesArray.capacidade,aeronavesArray.alcance,aeronavesArray.tipo)
    aeronave.pecas=aeronavesArray.pecas.map((pecas=>{ return new Pecas(pecas.nome,pecas.tipo,pecas.fornecedor,pecas.status)}))
    aeronave.etapas=aeronavesArray.etapas.map(etapa=>{return new Etapas(etapa.nome,etapa.prazo,etapa.status)})
    aeronave.testes=aeronavesArray.testes.map(teste=>{return new Teste(teste.tipo,teste.resultado)})
    const temEtapaPendente = aeronave.etapas.some(e => e.status !== "CONCLUIDA");
    const temTesteReprovado = aeronave.testes.some(t => t.resultado === "REPROVADO");

    if (temEtapaPendente) {
     throw new Error("ERRO:Existem etapas de produção que não foram CONCLUÍDAS");
    
    }

    if (temTesteReprovado) {
      throw new Error("ERRO: A aeronave possui testes REPROVADOS e não pode ser entregue");
      
    }
    const testesStr = aeronave.RelatorioTestes();
   const stringParaTxt="AEROCODE- RELATORIO DE ENTREGA"+'\n\n'+
    "Data de Emissão: "+new Date().toLocaleDateString('pt-BR')+'\n'+
    "Cliente: "+cliente+'\n'+
    "Data de Entrega: "+dataentrega+'\n'+
    "=".repeat(27)+'\n'+
    "DADOS DA AERONAVE"+'\n'+
    "-----------------"+'\n'+
    "Código: "+ aeronave.getId+'\n'+
    "Modelo: "+aeronave.modelo+'\n'+
    "Tipo: "+aeronave.tipo+'\n'+
    "Capacidade: " +String(aeronave.capacidade)+'\n\n'+
    "PEÇAS UTILIZADAS"+'\n'+
    "----------------"+'\n'+
    aeronave.RelatorioPecas()+'\n\n'+
    "ETAPA DE PRODUÇÃO"+'\n'+
    '-----------------'+'\n'+
    aeronave.RelatorioRtapas()+'\n\n'+
    "Resultado dos Testes"+'\n'+
    '--------------------'+'\n'+
    testesStr+'\n'+
    "=".repeat(27)+'\n'+
    "AERONAVE APROVADA"
   await fs.writeFile(
      path.resolve(__dirname, "..",'..', "database", "relatorios",aeronave.getId+"-"+Date.now().toString()+".txt"),
      stringParaTxt,
      "utf-8",
    );

    


  }
}