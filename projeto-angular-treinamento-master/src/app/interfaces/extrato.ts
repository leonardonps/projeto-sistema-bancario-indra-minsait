import { IConta } from "./conta";

export interface IExtrato {
  id: number;
  data: string;
  conta: IConta;
  transacao: string;
  valor: number;
}