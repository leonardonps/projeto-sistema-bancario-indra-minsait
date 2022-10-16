import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICliente } from 'src/app/interfaces/cliente';
import { IConta } from 'src/app/interfaces/conta';
import { AlertasService } from 'src/app/services/alertas.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-conta',
  templateUrl: './cadastrar-conta.component.html',
  styleUrls: ['./cadastrar-conta.component.css']
})


export class CadastrarContaComponent implements OnInit {

  constructor(
    private contaService: ContasService,
    private alertaService: AlertasService,
    private clienteService: ClientesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  idConta = 0;
  idCliente = 0;

  clientes: ICliente[] = [];

  contaForm = new FormGroup({
    agencia: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/)]),
    idCliente: new FormControl(),
    numero: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}[-]\d{1}$/)]),
    saldo: new FormControl(),
    //ativo: new FormControl(true)
  });
  
  ngOnInit(): void {
    this.buscarTodosClientes();
    this.idConta = Number(this.route.snapshot.paramMap.get('id'));
    if(this.idConta !== 0){
      this.contaService.buscarContaPorId(this.idConta).subscribe((conta: IConta) => {
        this.contaForm.setValue({
          agencia: conta.agencia,
          idCliente: conta.cliente?.id,
          numero: conta.numero,
          saldo: conta.saldo       
        });
      }, error =>{
        console.error(error);
      });
    }
  }

  buscarTodosClientes() {
    this.clienteService.listarTodosClientes().subscribe((clientes: ICliente[]) => {
      this.clientes = clientes;
    });
  }

  cadastrarConta(){
    this.clienteService.buscarClientePorId(this.contaForm.value.idCliente).subscribe((clienteEscolhidoService: ICliente) => {
      const dadosConta: IConta = {
        agencia: this.contaForm.value.agencia!,
        cliente: clienteEscolhidoService,
        numero: this.contaForm.value.numero!,
        saldo: this.contaForm.value.saldo!
      };

      if(this.idConta){
        dadosConta.id = this.idConta;
        this.contaService.atualizarCliente(dadosConta).subscribe(() => {
          this.alertaService.alertaSucesso('Conta do cliente foi editada com sucesso.');
          this.limpar();
          this.router.navigateByUrl('/contas');
        });
        return;
      }  
      
      Swal.fire({
        title: 'Nova Conta',
        text: "Está certo disso? Clique em confirmar para cadastrar nova conta.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#03973e',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.contaService.cadastrarContaService(dadosConta).subscribe(() => {
            Swal.fire(
              'Concluído',
              'A conta foi cadastrada com sucesso!',
              'success'
            )
            this.limpar();
          }, (error) => {
            this.alertaService.alertaErro('Por favor, tente novamente.')
          });     
        }
      })
    });

  }

  limpar(){
    this.contaForm.reset();
  }

  
  get agencia() {
    return this.contaForm.get('agencia');
  }

  get clienteId() {
    return this.contaForm.get('idCliente');
  }

  get numero() {
    return this.contaForm.get('numero');
  }

  get saldo() {
    return this.contaForm.get('saldo');
  }

}
