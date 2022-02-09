import { Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frase-mock';


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy{

  public frases: Array<Frase> = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''
  public rodada: number = 0
  public rodadaFrase: Frase
  public progresso: number = 0
  public tentativas: number = 3
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  public atualizaResposta(resposta: Event): void{
      this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void{

    if (this.rodadaFrase.frasePtBr == this.resposta){

      //Trocar a frase no template
      this.rodada++
      //Progresso
      this.progresso = this.progresso + (100 / this.frases.length)
      //Verificar vitória do jogador
      if(this.rodada === 4){
        this.encerrarJogo.emit('vitoria')
      }else{
        //atualiza o objeto que exibe a frase
        this.atualizaRodada()
      }

    }else{
      this.tentativas--
      if(this.tentativas === -1){
        this.encerrarJogo.emit('derrota')
      }
    }
  }

  public atualizaRodada(): void{
    //atualiza o objeto que exibe a frase
    this.rodadaFrase = this.frases[this.rodada]

    //Limpar resposta usuário
    this.resposta = ''
  }
}
