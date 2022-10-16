import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  endpoint = 'clientes/';
  api = environment.url;

  constructor(private http: HttpClient) { }

  listarTodosClientes() {
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoint}`);
  }
  
  cadastrarCliente(cliente: ICliente) {
    return this.http.post<ICliente[]>(`${this.api}/${this.endpoint}`, cliente);
  }

  atualizarCliente(cliente: ICliente) {
    return this.http.put<ICliente[]>(`${this.api}/${this.endpoint}/${cliente.id}`, cliente);
  }

  buscarClientePorId(id: number){
    return this.http.get<ICliente>(`${this.api}/${this.endpoint}/${id}`);
  }

  excluirClientePorId(id: number){
    return this.http.delete(`${this.api}/${this.endpoint}/${id}`);
  }
}
