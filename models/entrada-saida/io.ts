import promptSinc from "prompt-sync";

export default class Entrada{
        private prompt=promptSinc({ sigint: true })
      public receberNumero(message:string){
              const valor=parseInt(this.prompt(message))

              if (isNaN(valor)){
                throw new Error("ERRO:UM NÚMERO NÃO FOI PASSADO")
              }
              return valor

      }
      public receberTexto(message:string){
        const texto=this.prompt(message)
        return texto;
      }
}


