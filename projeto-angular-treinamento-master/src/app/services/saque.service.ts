import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOperacaoSimples } from '../interfaces/operacaoSimples';

@Injectable({
  providedIn: 'root'
})

export class SaqueService {

  endpoint = '/contas/sacar';
  api = environment.url;

  constructor(private http: HttpClient) { }

  sacarValorService(dadosSaque: IOperacaoSimples) {
    console.log(dadosSaque);
    return this.http.put(`${this.api}/${this.endpoint}`, dadosSaque);
  }

}
