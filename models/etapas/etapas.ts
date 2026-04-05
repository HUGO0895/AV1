import StatusEtapas from "./status_etapas"
import Funcionario from "../funcionario/funcionario"
export default class Etapas{
    public nome:string
    public prazo:string
    public status:StatusEtapas
    public funcionarios:Array<Funcionario>
    constructor(nome:string,prazo:string){
        this.nome=nome
        this.prazo=prazo
        this.status=StatusEtapas.Pendente
        this.funcionarios=new Array<Funcionario>()

    }
    public iniciar(){
        this.status=StatusEtapas.ANDAMENTO
    }
    public finalizar(){
        this.status=StatusEtapas.Concluida
    }
    public adiconarFunc(funcionario:Funcionario){
          this.funcionarios.push(funcionario)
    }
    public mostrare(){
        return  this.nome+" "+"Status: "+this.status
    }
}