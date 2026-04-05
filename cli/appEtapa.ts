import Entrada from "../models/entrada-saida/io";
import Etapas from "../models/etapas/etapas";
import StatusEtapas from "../models/etapas/status_etapas";
import EtapaService from "../service/etapa.Service";
import fs from 'fs/promises'
import path from 'path'
import Funcionario from "../models/funcionario/funcionario";
export default class AppEtapa {
  private entrada: Entrada = new Entrada();
  private etapaService: EtapaService = new EtapaService();
  public async adicionar() {
    const id = this.entrada.receberTexto("Digite um ID:");
    const nome = this.entrada.receberTexto("Nome:");
    const prazo=this.entrada.receberTexto("Prazo(DIA/MÊS/Ano):")
    const etapa= new Etapas(nome,prazo)
    await this.etapaService.create(etapa,id)
  }
  public async deletar() {
    const id = this.entrada.receberTexto("Digite um ID de Aerovanes valido:");
    const nomeDaEtapa = this.entrada.receberTexto(
      "Digite um nome de peça valido:",
    );
    try{
    await this.etapaService.remover(id, nomeDaEtapa);}
    catch(erro){
      console.log(erro.message)
    }
  }
  public async put() {
    const id = this.entrada.receberTexto("Digite um ID de Aerovanes valido:");
    const nomeDaPeca = this.entrada.receberTexto(
      "Digite um nome de Etapa valido:",
    );
    const status_temp = this.entrada
      .receberTexto("Status(PENDENTE,ANDAMENTO,CONCLUIDA):")
      .toLowerCase();
    const status =
      status_temp == "pendente"
        ? StatusEtapas.Pendente
        : status_temp == "andamento"
          ? StatusEtapas.ANDAMENTO
          : StatusEtapas.Concluida;
    await this.etapaService.put(status, id, nomeDaPeca);
  }
  public async read() {
    await this.etapaService.read();
  }
  public async addF(){
    let user:Funcionario=undefined;
    const usuario=this.entrada.receberTexto("Digite um Usuarios valido:")
    const id=this.entrada.receberTexto("Digite um id valido:")
    const nome=this.entrada.receberTexto("Nome da Etapa:")
      const funcionarioS= await fs.readFile(path.resolve(__dirname,'..','./database','funcionarios.json'),'utf-8');
             const  funcionarioArray=JSON.parse(funcionarioS);
             for(let x of funcionarioArray){
                if (x.usuario==usuario){
                      user= new Funcionario(x.nome,x.telefone,x.endereco,x.usuario,x.senha,x.nivelPermissao);
                }
             }
         await this.etapaService.adicionandoFunc(user,id,nome);

       }
  }

