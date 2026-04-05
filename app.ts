import Entrada from "./models/entrada-saida/io";
import AeronaveService from "./service/aeronaveService";
import FuncService from "./service/funcionarioService";
import AppAEro from "./cli/appAero";
import AppFunc from "./cli/appFunc";
import AppPeca from "./cli/appPeca";
import AppEtapa from "./cli/appEtapa";
import AppTeste from "./cli/appTeste";
import Funcionario from "./models/funcionario/funcionario";
class Aerocode {
  private entrada = new Entrada();
  private apAero: AppAEro = new AppAEro();
  private apFunc: AppFunc = new AppFunc();
  private appPeca: AppPeca = new AppPeca();
  private appEtapa:AppEtapa=new AppEtapa()
  private appTeste:AppTeste= new AppTeste()
  public interfaceInicial() {
    console.log("Aerocode CLI");
    console.log("1- Fazer Login");
    console.log("Outro- Sair");
    try {
      const escolha: number = this.entrada.receberNumero("Escolha:");
      if (escolha === 1) {
        console.clear();
        this.Login();
      }
      return;
    } catch (erro) {
      console.clear();
      console.log(erro.message);
      this.interfaceInicial();
    }
  }
  public async Login() {
    const usuario = this.entrada.receberTexto("Seu Usuario:");
    const senha = this.entrada.receberTexto("Sua Senha:");
   const [sucesso,funcionario] =await this.apFunc.Auth(usuario, senha)
    if (sucesso && funcionario) {
      console.clear();
     funcionario.nivelPermissao=='ADMINISTRADOR' ? await this.interfaceADMIN(funcionario):funcionario.nivelPermissao=='ENGENHEIRO' ? await this.interfaceENGENHEIRO(funcionario):await this.interfaceOperador(funcionario)
    } else {
      console.clear();
      console.log("ERRO: TENTE NOVAMENTE");
      this.interfaceInicial();
    }
  }
  public async interfaceADMIN(func:Funcionario) {
    console.log("Menu do Admin");
    console.log("1-Gerenciar Usuarios");
    console.log("2-Gerenciar Aeronaves");
    console.log("3-Gerenciar Peças");
    console.log("4-Gerenciar Etapas");
    console.log("5- Gerenciar Testes")
    console.log("6-Gerar Relatório de uma Aeronave");
    console.log("CTL+C-Sair");
    const escolha = this.entrada.receberNumero("Escolha Alguma opção:");
    switch (escolha) {
      case 1:
        console.log()
        await this.gerenciarUsuarios(func);
        break;
      case 2:
         console.log()
        await this.GerenciarAeronaves(func);
        break;
      case 3:
       console.log()
        await this.GerenciarPeças(func);
        break;
      case 4:
       console.log()
        await this.GerenciarEtapas(func);
        break;
      case 5:
       console.log()
        await this.gereciarTestes(func);
        break;
      case 6:
        try{
        await this.apAero.GerarRelatorio()}catch(erro){console.log(erro.message)};
        break;
    }
    await this.interfaceADMIN(func);
  }
  public async gerenciarUsuarios(func:Funcionario) {
    console.log("Gerenciador de Usuarios CLI");
    console.log("1-Adicionar Usuarios");
    console.log("2-Remover Usuarios");
    console.log("3- Ver todos os Usuarios");
    console.log("4-Atualizar um Usuario");
    console.log("5-Voltar ao Menu");
    console.log("CTL+C-Sair");
    const escolha = this.entrada.receberNumero("Escolha Alguma opção:");
    switch (escolha) {
      case 1:
        console.log()
        try{
        await this.apFunc.adicionar()}catch(erro){console.clear();console.log("ERRO:"+erro.message)};
        break;
      case 2:
        console.log()
        await this.apFunc.remover();
        break;
      case 3:
         console.log()
        await this.apFunc.Ver();
        break;
      case 4:
         console.log()
        await this.apFunc.put();
        break;
      case 5:
        console.log()
        await this.interfaceADMIN(func);
        break;
    }

    await this.gerenciarUsuarios(func);
  }
  public async GerenciarAeronaves(func:Funcionario) {
    console.log("Gerenciador de Aeronaves CLI");
    console.log("1-Adicionar Aeronaves");
    console.log("2-Remover Aeronaves");
    console.log("3-Ver todas as Aeronaves");
    console.log("4-Atualizar uma Aeronave");
    console.log("5-Voltar Para o Menu");
    console.log("CTL+C-Sair");
    const escolha = this.entrada.receberNumero("Escolha Alguma opção:");
    switch (escolha) {
      case 1:
         console.log()
        await this.apAero.adicionar();
        break;
      case 2:
        console.log()
        await this.apAero.deletar();
        break;
      case 3:
         console.log()
        await this.apAero.Ver();
        break;
      case 4:
         console.log()
        await this.apAero.atualizar();
        break;
      case 5:
        console.log()
        await this.interfaceADMIN(func);
        break;
    }

    await this.GerenciarAeronaves(func);
  }
  public async GerenciarPeças(func:Funcionario) {
    console.log("Gerenciador de Peças CLI");
    console.log("1-Adicionar Peça");
    console.log("2-Remover Peça");
    console.log("3-Ver todas as Peças");
    console.log("4-Atualizar uma Peça");
    console.log("5-Voltar Para o Menu");
    console.log("CTL+C-Sair");
    const escolha = this.entrada.receberNumero("Escolha Alguma opção:");
    switch (escolha) {
      case 1:
       console.log()
        await this.appPeca.adicionar();
        break;
      case 2:
       console.log()
        await this.appPeca.deletar();
        break;
      case 3:
        console.log()
        await this.appPeca.read();
        break;
      case 4:
       console.log()
        await this.appPeca.put();
        break;
      case 5:
        console.log()
        func.nivelPermissao=='ADMINISTRADOR' ? await this.interfaceADMIN(func):func.nivelPermissao=='ENGENHEIRO' ? await  this.interfaceENGENHEIRO(func):await this.interfaceOperador(func);
        break;
    }
await this.GerenciarPeças(func)
  }
  public async GerenciarEtapas(func:Funcionario) {
    console.log("Gerenciador de Etapas CLI");
    console.log("1-Adicionar Etapa");
    console.log("2-Remover Etapa");
    console.log("3-Ver todas as Etapas");
    console.log("4-Atualizar uma Etapa");
    console.log("5-Adicionar Funcionario em uma Etapa")
    console.log("6-Voltar Para o Menu");
    console.log("CTL+C-Sair");
     const escolha = this.entrada.receberNumero("Escolha Alguma opção:");
    switch (escolha) {
      case 1:
        console.log()
        try{
        await this.appEtapa.adicionar()}
        catch(erro){
          console.log(erro.message)
        };
        break;
      case 2:
        console.log()
        await this.appEtapa.deletar();
        break;
      case 3:
        await this.appEtapa.read();
        break;
      case 4:
        console.log()
        await this.appEtapa.put();
        break;
      case 5 :console.clear();
      await this.appEtapa.addF();
      break
      case 6:
        console.log()
       func.nivelPermissao=='ADMINISTRADOR' ? await this.interfaceADMIN(func):func.nivelPermissao=='ENGENHEIRO' ? await  this.interfaceENGENHEIRO(func):await this.interfaceOperador(func);;
        break;
    }
await this.GerenciarEtapas(func)
  }
  public async gereciarTestes(func:Funcionario){
    console.log("Gerenciador de Testes CLI");
    console.log("1-Adicionar Teste");
    console.log("2-Remover Teste");
    console.log("3-Ver todos os Testes");
    console.log("4-Atualizar um Teste");
    console.log("5-Voltar para o menu")
    console.log("CTL+C-Sair");
     const escolha = this.entrada.receberNumero("Escolha Alguma opção:");
    switch (escolha) {
      case 1:
        console.log()
        try{
        await this.appTeste.adicionar()}
        catch(erro){
          console.log(erro.message)
        };
        break;
      case 2:
        console.log()
        await this.appTeste.deletar();
        break;
      case 3:
        await this.appTeste.read();
        break;
      case 4:
       console.log()
        await this.appTeste.put();
        break;
      case 5:
       console.log()
        func.nivelPermissao=='ADMINISTRADOR' ? await this.interfaceADMIN(func):func.nivelPermissao=='ENGENHEIRO' ? await  this.interfaceENGENHEIRO(func):await this.interfaceOperador(func);
        break;
    }
   await this.gereciarTestes(func)
  }
  public async interfaceENGENHEIRO(func:Funcionario) {
    console.log("Menu do Engenheiro");
    console.log("1- Gerenciar Testes (Elétricos, Hidráulicos, Aerodinâmicos)");
    console.log("2- Visualizar Aeronaves e Peças");
    console.log("3- Gerar Relatório de Produção");
    console.log("CTL+C- Sair");

    const escolha = this.entrada.receberNumero("Escolha uma opção:");
    switch (escolha) {
      case 1:
        console.log()
        await this.gereciarTestes(func); 
        break;
      case 2:
        await this.apAero.Ver();
        break;
      case 3:
        console.log()
        try{
        await this.apAero.GerarRelatorio()}catch(erro){console.log(erro.message)}
        break;
    }
    await this.interfaceENGENHEIRO(func);
  }
  public async interfaceOperador(func:Funcionario) {
   
    console.log("Menu do Operador");
    console.log("1- Listar Aeronaves Designadas");
    console.log("2- Mudar status de uma Peça");
    console.log("3- Atualizar Status de Etapas");
    console.log("4- Adicionar Funcionarios a Etapas")
    console.log("5- Ver Todas as Peças no Estoque");
    console.log("CTL+C- Sair");

    const escolha = this.entrada.receberNumero("Escolha uma opção:");

    switch (escolha) {
      case 1:
        console.log();
       
        await this.apAero.Ver();
        break;
      case 2:
        console.log();
       
        await this.appPeca.put();
        break;
      case 3:
        console.log();
        
        await this.appEtapa.put();
        break;
      case 4:
        console.log()
        await this.appEtapa.addF()
        break;
      case 5:
        console.log();
        await this.appPeca.read();
        break;
    }

    await this.interfaceOperador(func);
  }
}

let a = new Aerocode();

a.interfaceInicial();
