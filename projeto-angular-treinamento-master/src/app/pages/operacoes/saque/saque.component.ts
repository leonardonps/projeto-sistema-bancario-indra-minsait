import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOperacaoSimples } from 'src/app/interfaces/operacaoSimples';
import { AlertasService } from 'src/app/services/alertas.service';
import { SaqueService } from 'src/app/services/saque.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.css']
})
export class SaqueComponent implements OnInit {

  constructor(
    private saqueService: SaqueService,
    private alertaService: AlertasService
  ) { }

  saqueForm = new FormGroup({
    agencia: new FormControl('',[Validators.required, Validators.pattern(/^\d{4}$/)]),
    numeroConta: new FormControl('',[Validators.required, Validators.pattern(/^\d{4}[-]\d{1}$/)]),
    valor: new FormControl(),
  });

  ngOnInit(): void {
  }

  sacarValor(){
    const dadosSaque: IOperacaoSimples = this.saqueForm.value as IOperacaoSimples;

    Swal.fire({
      title: 'Saque',
      text: "Está certo disso? Clique em confirmar para depositar.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#03973e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.saqueService.sacarValorService(dadosSaque).subscribe(() => {
          Swal.fire(
            'Concluído',
            'O saque foi realizado com sucesso!',
            'success'
          )
          this.limpar();
        }, (error) => {
          this.alertaService.alertaErro('Por favor, tente novamente.')
        });     
      }
    })
  }

  limpar(){
    this.saqueForm.reset();
  }

  get agencia() {
    return this.saqueForm.get('agencia');
  }

  get numeroConta() {
    return this.saqueForm.get('numeroConta');
  }
}



