import Aeronave from "../models/aeronave/aeronave";
import TipoAeronave from "../models/aeronave/tipoaeronave";
import Entrada from "../models/entrada-saida/io";
import AeronaveService from "../service/aeronaveService";
import FuncService from "../service/funcionarioService";

export default class AppAEro {
  private entrada = new Entrada();
  private aeroService: AeronaveService = new AeronaveService();

  public async adicionar() {
    const id = this.entrada.receberTexto("Id:");
    const modelo = this.entrada.receberTexto("Modelo:");
    const capacidade = this.entrada.receberNumero("Capacidade:");
    const tipo =
      this.entrada.receberTexto("Tipo(Militar ou Comercial):").toLowerCase() ==
      "militar"
        ? TipoAeronave.MILITAR
        : TipoAeronave.COMERCIAL;
    const alcance = this.entrada.receberNumero("Alcance:");
    const aeronave = new Aeronave(id, modelo, capacidade, alcance, tipo);
    await this.aeroService.create(aeronave);
  }
  public async deletar() {
    const id = this.entrada.receberTexto("Digite um ID de AERONAVE valido:");
    await this.aeroService.del(id);
  }
  public async atualizar() {
    console.log("Digite algo se quiser atualizar ou aperte Enter para não atualizar");
    const id = this.entrada.receberTexto("Digite um ID valido para busca:"); //CARNEIRO BONDOSO
    const modelo = this.entrada.receberTexto("Modelo:");
    const tipo_temp = this.entrada
      .receberTexto("Tipo(Militar ou Comercial):")
      .toLowerCase();
    const tipo =
      tipo_temp == ""
        ? undefined
        : tipo_temp == "militar"
          ? TipoAeronave.MILITAR
          : TipoAeronave.COMERCIAL;
    const capacidade = this.entrada.receberNumero("Capacidade:");
    const alcance = this.entrada.receberNumero("Alcance:");
    await this.aeroService.put(id, modelo, tipo, capacidade, alcance);
  }
  public async Ver() {
    await this.aeroService.read();
  }
 
}
