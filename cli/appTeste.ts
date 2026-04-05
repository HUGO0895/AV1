import Entrada from "../models/entrada-saida/io";
import { Resultado, TipoTeste } from "../models/teste/enumsTeste";
import Teste from "../models/teste/teste";
import TesteService from "../service/teste.Service";

export default class AppTeste{
        private entrada: Entrada = new Entrada();
        private testeService:TesteService=new TesteService()

    public async adicionar(){
        const id= this.entrada.receberTexto("Id de aeronave valido:")
        const tipo=this.entrada.receberTexto("Tipo do Teste(Eletrico,hidraulico,aerodinamico):")
        const tratamentoTipo= tipo.toLowerCase()=="eletrico" ? TipoTeste.ELETRICO:tipo.toLocaleLowerCase()=="hidraulico" ? TipoTeste.HIDRAULICO:TipoTeste.AERODINAMICO
        const resultado=this.entrada.receberTexto("Resultado:").toLowerCase()=="aprovado" ? Resultado.APROVADO:Resultado.REPROVADO
        await this.testeService.create(new Teste(tratamentoTipo,resultado),id)
    }
    public async deletar(){
         const id= this.entrada.receberTexto("Id de aeronave valido:")
         const tipo=this.entrada.receberTexto("Tipo do Teste(Eletrico,hidraulico,aerodinamico):")
        const tratamentoTipo= tipo.toLowerCase()=="eletrico" ? TipoTeste.ELETRICO:tipo.toLocaleLowerCase()=="hidraulico" ? TipoTeste.HIDRAULICO:TipoTeste.AERODINAMICO
        await this.testeService.remover(tratamentoTipo,id)
    }
    public async put(){
        const id= this.entrada.receberTexto("Id de aeronave valido:")
          const tipo=this.entrada.receberTexto("Tipo do Teste(Eletrico,hidraulico,aerodinamico):")
        const tratamentoTipo= tipo.toLowerCase()=="eletrico" ? TipoTeste.ELETRICO:tipo.toLocaleLowerCase()=="hidraulico" ? TipoTeste.HIDRAULICO:TipoTeste.AERODINAMICO
         const resultado=this.entrada.receberTexto("Resultado:").toLowerCase()=="aprovado" ? Resultado.APROVADO:Resultado.REPROVADO
         await this.testeService.put(resultado,tratamentoTipo,id)
    }
    public async read(){
        await this.testeService.read()
    }
}