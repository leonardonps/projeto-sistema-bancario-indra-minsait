import { Component, OnInit } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(
    private clienteService: ClientesService    ) { }
    
  clientes: ICliente[] = [];

  ngOnInit(): void {
    this.buscarTodosClientes();
  }

  buscarTodosClientes() {
    this.clienteService.listarTodosClientes().subscribe((clientes: ICliente[]) => {
      this.clientes = clientes;
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
        confirmButtonText: 'Sim, quero excluir o cliente',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.clienteService.excluirClientePorId(id).subscribe(() =>{
            Swal.fire(
              'Concluído',
              'O cliente foi excluído com sucesso!',
              'success'
            )
            this.buscarTodosClientes();
          }, (error) => {
            console.error(error);
          })
          return;
        }
      })
    }
  }

}