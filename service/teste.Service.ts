import fs from "fs/promises";
import path from "path";
import Teste from "../models/teste/teste";
export default class TesteService {
  public async create(teste: Teste, id: string) {
    const aeronavesS = await fs.readFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      "utf-8",
    );
    let verficacao = aeronavesS ? JSON.parse(aeronavesS) : [];
    verficacao = verficacao.map((avicao) => {
      for (let y of avicao.etapas) {
        if (y.status == "PENDENTE") {
          throw new Error(
            "Não foi possivel adicionar,pois existem etapas pendentes",
          );
        }
      }
    });

    const aeronavesArray = aeronavesS ? JSON.parse(aeronavesS) : [];
    for (let x of aeronavesArray) {
      if (x.id === id) {
        if (x.testes.length >= 3) {
          throw new Error("Só podem existem 3 tipos de testes");
        }
        x.testes.push(teste);
      }
    }
    const dadosJSON = JSON.stringify(aeronavesArray, null, 6);
    await fs.writeFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      dadosJSON,
      "utf-8",
    );
  }

  public async put(resultado: string, tipo: string, id: string) {
    const aeronavesS = await fs.readFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      "utf-8",
    );
    const aeronavesArray = aeronavesS ? JSON.parse(aeronavesS) : [];
    for (let x of aeronavesArray) {
      if (x.id === id) {
        for (let y of x.testes) {
          if (y.tipo === tipo) {
            y.resultado = resultado;
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

  public async remover(tipo: string, id: string) {
    const aeronavesS = await fs.readFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      "utf-8",
    );
    const aeronavesArray = aeronavesS ? JSON.parse(aeronavesS) : [];
    const aeronaDel = aeronavesArray.map((aerenove) => {
      if (aerenove.id === id) {
        aerenove.testes = aerenove.testes.filter(
          (peca) => peca.tipo != tipo.toUpperCase(),
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
  public async read(){
    const aeronavesS = await fs.readFile(
        path.resolve(__dirname, "..", "./database", "aeronaves.json"),
        "utf-8",
      );
      const aeronavesArray = aeronavesS ? JSON.parse(aeronavesS) : [];

      for (let x of aeronavesArray) {
        for (let y of x.testes) {
          console.log("Id de Aeronave:"+x.id)
         console.log("Tipo:"+y.tipo)
         console.log("Resultado:"+y.resultado)
          console.log()
           
          }
        }
      }
}
