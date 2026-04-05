import Funcionario from "../models/funcionario/funcionario";
import fs from 'fs/promises'
import path from 'path'
import NivelPermissao from "../models/funcionario/nivelPermissao";
export default class FuncService{
    
    public async create(funcionario:Funcionario){
         const funcionarioS= await fs.readFile(path.resolve(__dirname,'..','./database','funcionarios.json'),'utf-8');
         const  funcionarioArray=funcionarioS ? JSON.parse(funcionarioS):[];
         funcionarioArray.push(funcionario);
         const dadosJSON = JSON.stringify(funcionarioArray, null, 6)
         await fs.writeFile(path.resolve(__dirname,'..','./database','funcionarios.json'),dadosJSON,'utf-8')

    }
    public async put(id:string,nome:string,telefone:string,endereco:string,usuario:string,senha:string,nivelPermissao:NivelPermissao){
            const funcionarioS= await fs.readFile(path.resolve(__dirname,'..','./database','funcionarios.json'),'utf-8');
            const funcionario=JSON.parse(funcionarioS).map((a)=>{
                    if (a.id ===id){
                      
            if (nome){
                a.nome=nome
            }
            if(telefone){
                a.telefone=telefone
            }
            if(endereco){
                a.endereco=endereco
            }
            if(senha){
                a.senha=senha
            }
            if(nivelPermissao){
                a.nivelPermissao=nivelPermissao
            }
                    }
            return a;
            });
         
         await fs.writeFile(path.resolve(__dirname,'..','./database','funcionarios.json'),JSON.stringify(funcionario,null,6),'utf-8')
            
              
    }
    public async del(id:string){
        const funcionarioJ=await fs.readFile(path.resolve(__dirname,'..','./database','funcionarios.json'),'utf-8');
        const funcionarioS=JSON.parse(funcionarioJ).filter((a)=> a.id!=id)
        const dadosJSON=JSON.stringify(funcionarioS,null,6)
        await  fs.writeFile(path.resolve(__dirname,'..','./database','funcionarios.json'),dadosJSON,'utf-8')
    
}
   public async read(){
          const funcionarioS= await fs.readFile(path.resolve(__dirname,'..','./database','funcionarios.json'),'utf-8');
         const  funcionarioArray=JSON.parse(funcionarioS);
         for(let x of funcionarioArray){
            const user=new Funcionario(x.nome,x.telefone,x.endereco,x.usuario,x.senha,x.nivelPermissao)
            user.show()
            console.log()
         }
          await  fs.writeFile(path.resolve(__dirname,'..','./database','funcionarios.json'),funcionarioS,'utf-8')
   }
   public async  getFuncAuth(usuario:string,senha:string):Promise<[boolean,Funcionario|null]>{
         const funcionarioS= await fs.readFile(path.resolve(__dirname,'..','./database','funcionarios.json'),'utf-8');
         const  funcionarioArray=JSON.parse(funcionarioS);
         for(let x of funcionarioArray){
            if (x.usuario==usuario){
                  return [x.senha===senha,new Funcionario(x.nome,x.telefone,x.endereco,x.usuario,x.senha,x.nivelPermissao)];
            }
         }
   }

}