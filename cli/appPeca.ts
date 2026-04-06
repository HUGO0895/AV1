import Entrada from "../models/entrada-saida/io";
import Pecas from "../models/pecas/pecas";
import { StatusPecas, TiposPecas } from "../models/pecas/typePecas";
import PecaService from "../service/peca.Service";

export default class AppPeca {
  private entrada: Entrada = new Entrada();
  private pecaService: PecaService = new PecaService();
  public async adicionar() {
    const id = this.entrada.receberTexto("Digite um ID de AERONAVE valido::");
    const nome = this.entrada.receberTexto("Nome:");
    const tipo =
      this.entrada
        .receberTexto("Tipo de Peca(NACIONAL OU IMPORTADA):")
        .toLowerCase() == "nacional"
        ? TiposPecas.NACIONAL
        : TiposPecas.IMPORTADA;
    const fornecedor = this.entrada.receberTexto("Fornecedor");
    console.log(
      "Se o que for digitado em Status não fizer sentido,a Peça terá seu status como 'Pronta' automaticamente",
    );
    const status_temp = this.entrada
      .receberTexto("Status(EM PRODIÇÃO,EM TRANSPORTE,PRONTA):")
      .toLowerCase();
    const status =
      status_temp == "em produção"
        ? StatusPecas.EM_PRODUCAO
        : status_temp == "em transporte"
          ? StatusPecas.EM_TRANSPORTE
          : StatusPecas.PRONTA;
    const peca = new Pecas(nome, tipo, fornecedor, status);
    await this.pecaService.create(peca, id);
  }
  public async deletar() {
    const id = this.entrada.receberTexto("Digite um ID de Aerovanes valido:");
    const nomeDaPeca = this.entrada.receberTexto(
      "Digite um nome de peça valido:",
    );
    await this.pecaService.remover(id, nomeDaPeca);
  }
  public async put() {
    const id = this.entrada.receberTexto("Digite um ID de Aerovanes valido:");
    const nomeDaPeca = this.entrada.receberTexto(
      "Digite um nome de peça valido:",
    );
    const status_temp = this.entrada
      .receberTexto("Status(EM PRODIÇÃO,EM TRANSPORTE,PRONTA):")
      .toLowerCase(); // Neymar>>MESSI
    const status =
      status_temp == "em produção"
        ? StatusPecas.EM_PRODUCAO
        : status_temp == "em transporte"
          ? StatusPecas.EM_TRANSPORTE
          : StatusPecas.PRONTA;
    await this.pecaService.put(status, id, nomeDaPeca);
  }
  public async read() {
    await this.pecaService.read();
  }
}
