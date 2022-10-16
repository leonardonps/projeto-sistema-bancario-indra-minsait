import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './pages/clientes/cadastrar/cadastrar.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CadastrarContaComponent } from './pages/contas/cadastrar-conta/cadastrar-conta.component';
import { ContasComponent } from './pages/contas/contas.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { HomeComponent } from './pages/home/home.component';
import { DepositoComponent } from './pages/operacoes/deposito/deposito.component';
import { SaqueComponent } from './pages/operacoes/saque/saque.component';
import { TransferenciaComponent } from './pages/operacoes/transferencia/transferencia.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'clientes', component: ClientesComponent
  },
  {
    path: 'clientes/cadastrar', component: CadastrarComponent
  },
  {
    path: 'clientes/editar/:id', component: CadastrarComponent
  },
  {
    path: 'contas', component: ContasComponent
  },
  {
    path: 'contas/cadastrar-conta', component: CadastrarContaComponent
  },
  {
    path: 'contas/editar/:id', component: CadastrarContaComponent
  },
  {
    path: 'extrato', component: ExtratoComponent
  },
  {
    path: 'operacoes/deposito', component: DepositoComponent
  },
  {
    path: 'operacoes/saque', component: SaqueComponent
  },
  {
    path: 'operacoes/transferencia', component: TransferenciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
