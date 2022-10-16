import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOperacaoSimples } from 'src/app/interfaces/operacaoSimples';
import { AlertasService } from 'src/app/services/alertas.service';
import { DepositoService } from 'src/app/services/deposito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent implements OnInit {

  constructor(
    private depositoService: DepositoService,
    private alertaService: AlertasService
    ) {}

  depositoForm = new FormGroup({
    agencia: new FormControl('',[Validators.required, Validators.pattern(/^\d{4}$/)]),
    numeroConta: new FormControl('',[Validators.required, Validators.pattern(/^\d{4}[-]\d{1}$/)]),
    valor: new FormControl(),
  });

  ngOnInit(): void {
  }

  depositarValor(){
    const dadosDeposito: IOperacaoSimples = this.depositoForm.value as IOperacaoSimples;
    console.log(dadosDeposito.agencia);
    console.log(dadosDeposito.numeroConta);
    console.log(dadosDeposito.valor);

    Swal.fire({
      title: 'Depósito',
      text: "Está certo disso? Clique em confirmar para depositar.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#03973e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.depositoService.depositarValorService(dadosDeposito).subscribe(() => {
          Swal.fire(
            'Concluído',
            'O depósito foi realizado com sucesso!',
            'success'
          )
          this.limpar();
        }, (error) => {
          this.alertaService.alertaErro('Por favor, tente novamente.')
        });     
      }
    })

    // this.depositoService.depositarValorService(dadosDeposito).subscribe(() => {
    //   this.alertaService.alertaSucesso('O depósito foi realizado com sucesso.');
    // });
    
    return;
  }

  limpar(){
    this.depositoForm.reset();
  }


  get agencia() {
    return this.depositoForm.get('agencia');
  }

  get numeroConta() {
    return this.depositoForm.get('numeroConta');
  }

}
