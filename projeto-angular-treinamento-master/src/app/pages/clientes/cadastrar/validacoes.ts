import { AbstractControl } from "@angular/forms";
import { validate } from "node_modules/gerador-validador-cpf"

export class Validacoes {
  static ValidaCpf(controle: AbstractControl) {
    const cpf = controle.value;
    let valido: boolean;
    const regex = new RegExp(/^\d{11}$/);

    if (!validate(cpf) || !regex.test(cpf)){
      valido = false;
    }
    else {
      valido = true;
    }

    if (valido) return null;

    return { cpfInvalido: true };
  
    }
}