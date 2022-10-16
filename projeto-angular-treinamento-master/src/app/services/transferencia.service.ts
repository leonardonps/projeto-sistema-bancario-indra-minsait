import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOperacaoTransferencia } from '../interfaces/operacaoTransferencia';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  endpoint = '/contas/transferencia';
  api = environment.url;

  constructor(private http: HttpClient) { }

  transferirValorService(dadosTransferencia: IOperacaoTransferencia) {
    console.log(dadosTransferencia);
    return this.http.put(`${this.api}/${this.endpoint}`, dadosTransferencia);
  }

}
