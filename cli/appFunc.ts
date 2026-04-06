import Entrada from "../models/entrada-saida/io";
import Funcionario from "../models/funcionario/funcionario";
import NivelPermissao from "../models/funcionario/nivelPermissao";
import FuncService from "../service/funcionarioService";

export default class AppFunc {
  private entrada: Entrada = new Entrada();
  private funcServ: FuncService = new FuncService();

  public async adicionar() {
    const nome = this.entrada.receberTexto("Nome:");
    const telefone = this.entrada.receberTexto("Telefone:");
    const endereco = this.entrada.receberTexto("Endereço:");
    const usuario = this.entrada.receberTexto("User Name:");
    const senha = this.entrada.receberTexto("Senha:");
    let nivelPermissao: any = this.entrada
      .receberTexto("Nivel de Permissão:")
      .toLowerCase();  // LIndo ARTESÃO
    switch (nivelPermissao) {
      case "operador":
        nivelPermissao = NivelPermissao.OPERADOR;
        break;
      case "engenheiro":
        nivelPermissao = NivelPermissao.ENGENHEIRO;
        break;
      case "administrador":
        nivelPermissao = NivelPermissao.ADMINISTRADOR;
        break;
      default:
        nivelPermissao = undefined;
        break;
    }
    const funcionario = new Funcionario(
      nome,
      telefone,
      endereco,
      usuario,
      senha,
      nivelPermissao,
    );
    await this.funcServ.create(funcionario);
  }

  public async remover() {
    const id = this.entrada.receberTexto("Digite um ID de Funcionarios valido:");
    await this.funcServ.del(id);
  }

  public async put() {
     console.log("Digite algo se quiser atualizar ou aperte Enter para não atualizar");
    const id = this.entrada.receberTexto("Digite um ID valido:");
    const nome = this.entrada.receberTexto("Nome:");
    const usuario = this.entrada.receberTexto("Usuario:");
    const telefone = this.entrada.receberTexto("Telefone:");
    const endereco = this.entrada.receberTexto("Enredeço:");
    const senha = this.entrada.receberTexto("Senha:");
    let nivelPermissao: any = this.entrada
      .receberTexto("Nivel de Permissão:")
      .toLowerCase();
    switch (nivelPermissao) {
      case "operador":
        nivelPermissao = NivelPermissao.OPERADOR;
        break;
      case "engenheiro":
        nivelPermissao = NivelPermissao.ENGENHEIRO;
        break;
      case "administrador":
        nivelPermissao = NivelPermissao.ADMINISTRADOR;
        break;
      default:
        nivelPermissao = undefined;
        break;
    }
    await this.funcServ.put(
      id,
      nome,
      telefone,
      endereco,
      usuario,
      senha,
      nivelPermissao,
    );
  }
  public async Ver() {
    await this.funcServ.read();
  }

  public async Auth(usuario: string, senha: string) {
    return await this.funcServ.getFuncAuth(usuario, senha);
  }
}
