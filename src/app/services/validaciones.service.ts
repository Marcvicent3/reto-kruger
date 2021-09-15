import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

  nameValidation(name: string){
    const pattern = /[a-zA-Z\t\h]+|(^$)/;

    if (name != null && name != '' && name != undefined){
      if (name.match(pattern)){
        return true;
      }
    }
    return false;
  }

  idValidation(valor: any, compareId) {
    let total = 0;
    let longitud = valor.length;
    let contador = 1;

    if (compareId != valor){
      if (valor !== '' && longitud === 10){
          for (const digito of valor) {
            if (contador < 10){
              if (contador % 2 !== 0){
                  let aux = digito * 2;
                  if (aux > 9) { aux -= 9; }
                  total += aux;
              }else{
                  total += parseInt(digito);
              }
            }
            contador += 1;
          }
          total = total % 10 ? 10 - total % 10 : 0;
          if (valor.substring(9) == total){
              return true;
          }else{
            return false;
          }
      }else{
        return false;
      }
    }else{
      return true;
    }
  }

  esEmailValido(email: string):boolean {
    'use strict';
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email != null && email != '' && email != undefined){
      if (email.match(emailRegex)){
        return true;
      }
    }
    return false;
  }
}
