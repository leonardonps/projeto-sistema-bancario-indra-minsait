import { Component, OnInit } from '@angular/core';
import { IConta } from 'src/app/interfaces/conta';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {

  constructor(
    private contaService: ContasService    ) { }
  contas: IConta[] = [];

  ngOnInit(): void {
    this.buscarTodasContas();
   
  }

  buscarTodasContas() {
    this.contaService.buscarTodasContas().subscribe((contas: IConta[]) => {
      this.contas = contas;
    });
  }

  excluir(id?: number){
    if(id){
      Swal.fire({
        title: 'Excluir Cliente',
        text: "Tem certeza disso? Não será possível desfazer essa ação.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#03973e',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, quero excluir a conta',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.contaService.excluirContaPorId(id).subscribe(() =>{
            Swal.fire(
              'Concluído',
              'A conta foi excluída com sucesso!',
              'success'
            )
            this.buscarTodasContas();
          }, (error) => {
            console.error(error);
          })
          return;
        }
      })
    }
  }
}