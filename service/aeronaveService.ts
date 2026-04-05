import fs from "fs/promises";
import path from "path";
import Aeronave from "../models/aeronave/aeronave";
import TipoAeronave from "../models/aeronave/tipoaeronave";
import Pecas from "../models/pecas/pecas";
import Etapas from "../models/etapas/etapas";
import Teste from "../models/teste/teste";
export default class AeronaveService {
  public async create(aeronave: Aeronave) {
    const aeronavesS = await fs.readFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      "utf-8",
    );
    const aeronavesArray = aeronavesS ? JSON.parse(aeronavesS) : [];
    aeronavesArray.push(aeronave);
    const dadosJSON = JSON.stringify(aeronavesArray, null, 6);
    await fs.writeFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      dadosJSON,
      "utf-8",
    );
  }
  public async put(
    id: string,
    modelo: string,
    tipo: TipoAeronave,
    capacidade: number,
    alcance: number,
  ) {
    const aeronavesS = await fs.readFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      "utf-8",
    );
    const aeronave = JSON.parse(aeronavesS).map((a) => {
      if (a.id === id) {
        if (modelo) {
          a.modelo = modelo;
        }
        if (tipo) {
          a.tipo = tipo;
        }
        if (capacidade) {
          a.capacidade = capacidade;
        }
        if (alcance) {
          a.alcance = alcance;
        }
      }
      return a;
    });

    await fs.writeFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      JSON.stringify(aeronave, null, 6),
      "utf-8",
    );
  }
  public async del(id: string) {
    const aeronaveJ = await fs.readFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      "utf-8",
    );
    const aeronaveS = JSON.parse(aeronaveJ).filter((a) => a.id != id);
    const dadosJSON = JSON.stringify(aeronaveS, null, 6);
    await fs.writeFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      dadosJSON,
      "utf-8",
    );
  }
  public async read() {
    const aeronavesS = await fs.readFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      "utf-8",
    );
    const aeronavesArray = JSON.parse(aeronavesS);
    for (let x of aeronavesArray) {
      const aeronave: Aeronave = new Aeronave(
        x.id,
        x.modelo,
        x.capacidade,
        x.alcance,
        x.tipo,
      );
      aeronave.pecas = x.pecas || [];
      aeronave.etapas = x.etapas || [];
      aeronave.testes = x.testes || [];
      aeronave.detalhes();
      console.log();
    }
  }
  public async gerarRelatorio(id:string,dataentrega:string,cliente:string){
     const aeronavesS = await fs.readFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      "utf-8",
    );
    const aeronavesArray = JSON.parse(aeronavesS).find((aeronave)=> aeronave.id==id);
    const aeronave= new Aeronave(aeronavesArray.id,aeronavesArray.modelo,aeronavesArray.capacidade,aeronavesArray.alcance,aeronavesArray.tipo)
    aeronave.pecas=aeronavesArray.pecas.map((pecas=>{ return new Pecas(pecas.nome,pecas.tipo,pecas.fornecedor,pecas.status)}))
    aeronave.etapas=aeronavesArray.etapas.map(etapa=>{return new Etapas(etapa.nome,etapa.prazo)})
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
      path.resolve(__dirname, "..", "./database", "./relatorios",aeronave.getId+new Date()+"RELATORIO.txt"),
      stringParaTxt,
      "utf-8",
    );

    


  }
}
