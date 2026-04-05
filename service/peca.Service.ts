import path from "path";
import Entrada from "../models/entrada-saida/io";
import Pecas from "../models/pecas/pecas";
import fs from "fs/promises";
import { StatusPecas } from "../models/pecas/typePecas";
export default class PecaService {

  public async create(peca: Pecas, id: string) {
    const aeronavesS = await fs.readFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      "utf-8",
    );
    const aeronavesArray = aeronavesS ? JSON.parse(aeronavesS) : [];
    for (let x of aeronavesArray) {
      if (x.id === id) {
        x.pecas.push(peca);
      }
    }
    const dadosJSON = JSON.stringify(aeronavesArray, null, 6);
    await fs.writeFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      dadosJSON,
      "utf-8",
    );
  }
  public async put(status: StatusPecas, id: string, nomeDaPeca: string) {
    const aeronavesS = await fs.readFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      "utf-8",
    );
    const aeronavesArray = aeronavesS ? JSON.parse(aeronavesS) : [];
    for (let x of aeronavesArray) {
      if (x.id === id) {
        for (let y of x.pecas) {
          if (y.name === nomeDaPeca) {
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
  public async remover(id: string, nomeDaPeca: string) {
    const aeronavesS = await fs.readFile(
      path.resolve(__dirname, "..", "./database", "aeronaves.json"),
      "utf-8",
    );
    const aeronavesArray = aeronavesS ? JSON.parse(aeronavesS) : [];
    const aeronaDel = aeronavesArray.map((aerenove) => {
      if (aerenove.id === id) {
        aerenove.pecas = aerenove.pecas.filter(
          (peca) => peca.name != nomeDaPeca,
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
        for (let y of x.pecas) {
          console.log("Id da Aeronave:"+x.id)
          console.log("Nome da Peça:"+y.name);
          console.log("Tipo da Peça:"+y.tipo);
          console.log("Fornecedor da Peça:"+y.fornecedor);
          console.log("Status da Peça:"+y.status)
          console.log()
           
           
          }
        }
      
      }
    }
  

