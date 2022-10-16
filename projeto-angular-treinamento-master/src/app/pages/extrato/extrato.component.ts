import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IExtrato } from 'src/app/interfaces/extrato';
import { ExtratoService } from 'src/app/services/extrato.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  constructor(private extratoService: ExtratoService) { }
  
  listaExtrato: IExtrato[] = [];
  listaExtratoDataHora: string[] = [];
  elementosExtratoDataHoraDividido: Array<String>[] = [];
  listaExtratoData: string[] = [];


  extratoForm = new FormGroup({
    agencia: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/)]),
    conta: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}[-]\d{1}$/)]),
    dataInicial: new FormControl('', Validators.required),
    dataFinal: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    
  }

  consultarExtrato(){
    let container = document.getElementById("area-extrato");
    
    container?.classList.remove("hide");

    this.extratoService.buscarExtrato(this.extratoForm.value.agencia!, this.extratoForm.value.conta!, this.extratoForm.value.dataInicial!, this.extratoForm.value.dataFinal!).subscribe((listaExtrato: IExtrato[]) => {
      this.listaExtrato = listaExtrato;
      for(let i = 0; i < this.listaExtrato.length; i++){
          this.listaExtratoDataHora[i] = this.listaExtrato[i].data
          this.elementosExtratoDataHoraDividido[i] = this.listaExtratoDataHora[i].split('T');
          this.listaExtratoData[i] = this.elementosExtratoDataHoraDividido[i][0].replace(/\-/g, '/').split('/').reverse().join('/');
          this.listaExtrato[i].data = this.listaExtratoData[i];
      } 
      //this.limpar();
    });
  }

  limpar(){
    this.extratoForm.reset();
  }

  get agencia() {
    return this.extratoForm.get('agencia');
  }

  get conta() {
    return this.extratoForm.get('conta');
  }

  get dataInicial() {
    return this.extratoForm.get('dataInicial');
  }

  get dataFinal() {
    return this.extratoForm.get('dataFinal');
  }

}
