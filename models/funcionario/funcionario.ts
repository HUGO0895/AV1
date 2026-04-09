import NivelPermissao from "./nivelPermissao"
import { createHash,randomBytes } from 'crypto';
export default class Funcionario {
    private static contador: number = 0
    
    private id: string
    public nome: string
    public telefone: string
    public endereco: string
    public usuario: string
    public senha: string
    public nivelPermissao: NivelPermissao
   private static salt:string = randomBytes(16).toString('hex');
    constructor(nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelPermissao: NivelPermissao) {
        Funcionario.contador++
        this.id = createHash('sha256').update(Funcionario.contador.toString()+Funcionario.salt).digest('hex')
        
        this.nome = nome
        this.telefone = telefone
        this.endereco = endereco
        this.usuario = usuario
        this.senha = senha
        this.nivelPermissao = nivelPermissao
    }

    public show() {
        const tabela = [
            `ID: ${this.id}`,
            `Nome: ${this.nome}`,
            `User: ${this.usuario}`,
            `Telefone: ${this.telefone}`,
            `Endereço: ${this.endereco}`,
            `NivelPermissão: ${this.nivelPermissao}`
        ]
        
        const maior = Math.max(...tabela.map(l => l.length))
        const tamanhoLinha = maior + 4
        
        console.log('-'.repeat(tamanhoLinha + 1))
        tabela.forEach((linha) => {
            console.log('|' + " ".repeat(2) + linha + ' '.repeat(maior - linha.length) + ' |');
            console.log('-'.repeat(tamanhoLinha + 1))
        })
    }

    get Id() {
        return this.id
    }
}