import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ContasComponent } from './pages/contas/contas.component';
import { CadastrarComponent } from './pages/clientes/cadastrar/cadastrar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { SaqueComponent } from './pages/operacoes/saque/saque.component';
import { DepositoComponent } from './pages/operacoes/deposito/deposito.component';
import { TransferenciaComponent } from './pages/operacoes/transferencia/transferencia.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { CadastrarContaComponent } from './pages/contas/cadastrar-conta/cadastrar-conta.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';





@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    HomeComponent,
    HeaderComponent,
    ContasComponent,
    CadastrarComponent,
    FooterComponent,
    ExtratoComponent,
    SaqueComponent,
    DepositoComponent,
    TransferenciaComponent,
    OperacoesComponent,
    CadastrarContaComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
