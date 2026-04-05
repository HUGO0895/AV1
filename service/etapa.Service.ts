import path from "path";
import Entrada from "../models/entrada-saida/io";
import fs from "fs/promises";
import Etapas from "../models/etapas/etapas";
import StatusEtapas from "../models/etapas/status_etapas";
import Funcionario from "../models/funcionario/funcionario";
export default class EtapaService {

  public async create(etapa: Etapas, id: string) {
    const aeronavesS = await fs.readFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      "utf-8",
    );
     let verficacao = aeronavesS ? JSON.parse(aeronavesS) : [];
     verficacao=verficacao.map(avicao=> {
    
          for(let y of avicao.etapas){
            if(y.status=="PENDENTE"){
              throw new Error("Não foi possivel adicionar,pois existem etapas pendentes")
            }
          }
      

     }
     )
    
    const aeronavesArray = aeronavesS ? JSON.parse(aeronavesS) : [];
    for (let x of aeronavesArray) {
      if (x.id === id) {
        x.etapas.push(etapa);
      }
    }
    const dadosJSON = JSON.stringify(aeronavesArray, null, 6);
    await fs.writeFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      dadosJSON,
      "utf-8",
    );
  }
  public async put(status: StatusEtapas, id: string, nomeDaEtapa: string) {
    const aeronavesS = await fs.readFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      "utf-8",
    );
    const aeronavesArray = aeronavesS ? JSON.parse(aeronavesS) : [];
    for (let x of aeronavesArray) {
      if (x.id === id) {
        for (let y of x.etapas) {
          if (y.nome === nomeDaEtapa) {
            y.status = status;
            break;
          }
        }
        break;
      }
    }
    const dadosJSON = JSON.stringify(aeronavesArray, null, 6);
    await fs.writeFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      dadosJSON,
      "utf-8",
    );
  }
  public async remover(id: string, nomeDaEtapa: string) {
    const aeronavesS = await fs.readFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      "utf-8",
    );
    const aeronavesArray = aeronavesS ? JSON.parse(aeronavesS) : [];
    const aeronaDel = aeronavesArray.map((aerenove) => {
      if (aerenove.id === id) {
        aerenove.etapas = aerenove.etapas.filter(
          (peca) => peca.nome != nomeDaEtapa,
        );
      }
      return aerenove;
    });
    const dadosJSON = JSON.stringify(aeronaDel, null, 6);
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
    const aeronavesArray = aeronavesS ? JSON.parse(aeronavesS) : [];
    for (let x of aeronavesArray) {
        for (let y of x.etapas) {
          console.log("Id da Aeronave:"+x.id)
          console.log("Nome da Etapa:"+y.nome);
          console.log("Prazo da Etapa:"+y.prazo);
          const passandoString=JSON.stringify(y.funcionarios.map(func=>func.nome))
          const adptando=passandoString.slice(1,passandoString.length-1).replace(/"/g,'')
          console.log("Funcionarios Responsaveis:"+adptando);
          console.log("Status da Etapa:"+y.status)
          console.log()
           
           
          }
        }
      
      }
    public async adicionandoFunc(funcionario:Funcionario,id:string,nomeDaEtapa:string){
     const aeronavesS = await fs.readFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      "utf-8",
    );
    const aeronavesArray = aeronavesS ? JSON.parse(aeronavesS) : [];
    for (let x of aeronavesArray) {
      if (x.id === id) {
        for(let y of x.etapas)
          if(y.nome===nomeDaEtapa)y.funcionarios.push(funcionario)
        break;
      }
    }
    const dadosJSON = JSON.stringify(aeronavesArray, null, 6);
    await fs.writeFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      dadosJSON,
      "utf-8",
    )}
    }
  

