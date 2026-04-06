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
 
}
