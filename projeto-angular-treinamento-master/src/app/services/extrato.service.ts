import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IExtrato } from '../interfaces/extrato';

@Injectable({
  providedIn: 'root'
})

export class ExtratoService {

  middlepoint = "buscarExtrato";
  endpoint = 'extratos';
  api = environment.url;

  constructor(private http: HttpClient) { }

  buscarExtrato(agencia: string, conta: string, dataInicial: string, dataFinal: string){
    
    return this.http.get<IExtrato[]>(`${this.api}/${this.endpoint}/${this.middlepoint}/${agencia}/${conta}/${dataInicial}/${dataFinal}`);
    
  }
}
