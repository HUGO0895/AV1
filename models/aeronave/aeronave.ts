import Etapas from "../etapas/etapas";
import Pecas from "../pecas/pecas";
import Testes from "../teste/teste";
import TipoAeronave from "./tipoaeronave";
import { StatusPecas, TiposPecas } from "../pecas/typePecas";
export default class Aeronave {
  private id: string;
  public modelo: string;
  public tipo: TipoAeronave;
  public capacidade: number;
  public alcance: number;
  public pecas: Array<Pecas>;
  public etapas: Array<Etapas>;
  public testes: Array<Testes>;

  constructor(
    id: string,
    modelo: string,
    capacidade: number,
    alcance: number,
    tipo: TipoAeronave,
  ) {
    this.id = id;
    this.tipo = tipo;
    this.modelo = modelo;
    this.pecas = new Array<Pecas>();
    this.etapas = new Array<Etapas>();
    this.testes = new Array<Testes>();
    this.capacidade = capacidade;
    this.alcance = alcance;
  }
  get getId() {
    return this.id;
  }
  public detalhes(): void {
    const tabela = [
      `Aeronave:${this.id}`,
      `Modelo:${this.modelo}`,
      `Peças:${this.mostrarPecas()}`,
      `Etapas:${this.mostrarEtapas()}`,
      `Testes:${this.mostrarTeste()}`,
      `Capacidade:${this.capacidade}`,
      `Alcance:${this.alcance}`,
    ];
    const maior = Math.max(...tabela.map((l) => l.length));
    const tamanhoLinha = maior + 4;
    console.log("-".repeat(tamanhoLinha + 1));
    tabela.forEach((linha) => {
      console.log(
        "|" + " ".repeat(2) + linha + " ".repeat(maior - linha.length) + " |",
      );
      console.log("-".repeat(tamanhoLinha + 1));
    });
  }

  public salvar(): void {}
  private mostrarPecas(): string {
    let nomes_Pecas = "";
    for (let x of this.pecas) {
      nomes_Pecas += x.name + ",";
    }
    return nomes_Pecas.slice(0, -1);
  }
  private mostrarEtapas(): string {
    let nomes_Etapas = "";
    for (let x of this.etapas) {
      nomes_Etapas += x.nome + ",";
    }
    return nomes_Etapas.slice(0, -1);
  }
  private mostrarTeste(){
    let nomes_Testes = "";
    for (let x of this.testes) {
      nomes_Testes += x.tipo + ",";
    }
    return nomes_Testes.slice(0, -1);
  }
  public RelatorioPecas(){
    let string="";
    for(let x of this.pecas){
      string+=x.mostrarP()+'\n'
    }
    return string.slice(0,-1);
  }
  public RelatorioRtapas(){
    let string=""
    for(let x of this.etapas){
      string+=x.mostrare()+'\n'
    }
    return string.slice(0,-1)
  }
  public RelatorioTestes(){
    let string="";
    for(let x of this.testes){
      string+=x.mostarTeste()+'\n'
    }
    return string.slice(0,-1)
  }
}
