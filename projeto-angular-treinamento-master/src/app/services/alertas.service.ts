import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AlertasService {

  constructor() { }

  alertaSucesso(mensagem: string){
    Swal.fire({
      title: 'Parabéns!',
      text: mensagem,
      icon: 'success'
  })
  }
  alertaErro(mensagem: string){
    Swal.fire({
      title: 'Ooops',
      text: mensagem,
      icon: 'error'
    })
  }
  
  
  alertaConfirmarOperacao(mensagem: string){
    Swal.fire({
      title: 'Confirmar Operação',
      text: mensagem,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#03973e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, quero fazer essa operação',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Concluído',
          'O cliente foi excluído com sucesso!',
          'success'
        )
      }
    })
  }
}
