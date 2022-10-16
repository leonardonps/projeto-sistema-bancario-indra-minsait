import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICliente } from 'src/app/interfaces/cliente';
import { AlertasService } from 'src/app/services/alertas.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { Validacoes } from 'src/app/pages/clientes/cadastrar/validacoes';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})

export class CadastrarComponent implements OnInit {

  constructor(
    private clientesService: ClientesService,
    private route: ActivatedRoute,
    private alertaService: AlertasService, 
    private router: Router
    ) { }

  idCliente = 0;

  clienteForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    cpf: new FormControl('', [Validators.required, Validacoes.ValidaCpf]),
    email: new FormControl('', [Validators.required, Validators.email]),
    observacoes: new FormControl(''),
    ativo: new FormControl(true)
  });

  ngOnInit(): void {
    this.idCliente = Number(this.route.snapshot.paramMap.get('id'));
    if(this.idCliente !== 0){
      this.clientesService.buscarClientePorId(this.idCliente).subscribe((cliente: ICliente) => {
        this.clienteForm.setValue({
          nome: cliente.nome,
          cpf:cliente.cpf,
          email: cliente.email,
          observacoes: cliente.observacoes || '',
          ativo: cliente.ativo || false          
        });
      }, error =>{
        console.error(error);
      });
    }
  } 

  cadastrar(){
      const cliente: ICliente = this.clienteForm.value as ICliente;
      cliente.ativo = true;

      if(this.idCliente){
        cliente.id = this.idCliente;
        this.clientesService.atualizarCliente(cliente).subscribe(() => {
          this.alertaService.alertaSucesso('Conta do cliente foi editada com sucesso.');
          this.limpar();
          this.router.navigateByUrl('/clientes');
        });
        return;
      }
  
      Swal.fire({
        title: 'Novo Cliente',
        text: "Está certo disso? Clique em confirmar para cadastrar novo cliente.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#03973e',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.clientesService.cadastrarCliente(cliente).subscribe(() => {
            Swal.fire(
              'Concluído',
              'O cliente foi cadastrado com sucesso!',
              'success'
            )
            this.limpar();
          }, (error) => {
            this.alertaService.alertaErro('Por favor, tente novamente.')
          });
        }
      })



      // this.clientesService.cadastrarCliente(cliente).subscribe(() => {
      //   this.alertaService.alertaSucesso('Conta foi cadastrada com sucesso')
      //   this.limpar();
      // }, (error) => {
      //   this.alertaService.alertaErro('Por favor, tente novamente.')
      // });
  }

  limpar(){
    this.clienteForm.reset();
  }

  get nome() {
    return this.clienteForm.get('nome');
  }

  get email() {
    return this.clienteForm.get('email');
  }

  get cpf() {
    return this.clienteForm.get('cpf');
  }

}
