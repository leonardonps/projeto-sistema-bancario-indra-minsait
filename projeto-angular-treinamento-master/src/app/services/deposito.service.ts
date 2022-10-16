import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOperacaoSimples } from '../interfaces/operacaoSimples';

@Injectable({
  providedIn: 'root'
})

export class DepositoService {

  endpoint = 'contas/deposito';
  api = environment.url;

  constructor(private http: HttpClient) { }

  depositarValorService(dadosDeposito: IOperacaoSimples) {
    return this.http.put(`${this.api}/${this.endpoint}`, dadosDeposito);
  }

}
