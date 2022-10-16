import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOperacaoTransferencia } from 'src/app/interfaces/operacaoTransferencia';
import { AlertasService } from 'src/app/services/alertas.service';
import { TransferenciaService } from 'src/app/services/transferencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  constructor(
    private transferenciaService: TransferenciaService,
    private alertaService: AlertasService
  ) { }

  transferenciaForm = new FormGroup({
    agenciaOrigem: new FormControl('',[Validators.required, Validators.pattern(/^\d{4}$/)]),
    agenciaDestino: new FormControl('',[Validators.required, Validators.pattern(/^\d{4}$/)]),
    numeroContaOrigem: new FormControl('',[Validators.required, Validators.pattern(/^\d{4}[-]\d{1}$/)]),
    numeroContaDestino: new FormControl('',[Validators.required, Validators.pattern(/^\d{4}[-]\d{1}$/)]),
    valor: new FormControl(),
  });

  ngOnInit(): void {
  }

  transferirValor(){
    const dadosTransferencia: IOperacaoTransferencia = this.transferenciaForm.value as IOperacaoTransferencia;
    Swal.fire({
      title: 'Transferência',
      text: "Está certo disso? Clique em confirmar para transferir.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#03973e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.transferenciaService.transferirValorService(dadosTransferencia).subscribe(() => {
          Swal.fire(
            'Concluído',
            'A transferência foi realizada com sucesso!',
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
    this.transferenciaForm.reset();
  }

  get agenciaOrigem() {
    return this.transferenciaForm.get('agenciaOrigem');
  }

  get agenciaDestino() {
    return this.transferenciaForm.get('agenciaDestino');
  }

  get numeroContaOrigem() {
    return this.transferenciaForm.get('numeroContaOrigem');
  }

  get numeroContaDestino() {
    return this.transferenciaForm.get('numeroContaDestino');
  }
}
