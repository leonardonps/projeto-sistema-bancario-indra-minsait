import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IConta } from '../interfaces/conta';

@Injectable({
  providedIn: 'root'
})
export class ContasService {

  endpoint = 'contas/';
  api = environment.url;

  constructor(private http: HttpClient) { }

  buscarTodasContas() {
    return this.http.get<IConta[]>(`${this.api}/${this.endpoint}`);
  }

  cadastrarContaService(dadosConta: IConta) {
    return this.http.post(`${this.api}/${this.endpoint}`, dadosConta);
  }

  atualizarCliente(conta: IConta) {
    return this.http.put(`${this.api}/${this.endpoint}/${conta.id}`, conta);
  }

  buscarContaPorId(id: number){
    return this.http.get<IConta>(`${this.api}/${this.endpoint}/${id}`);
  }

  excluirContaPorId(id: number){
    return this.http.delete(`${this.api}/${this.endpoint}/${id}`);
  }
}
