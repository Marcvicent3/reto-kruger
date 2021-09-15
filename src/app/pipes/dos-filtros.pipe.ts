import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dosFiltros'
})
export class DosFiltrosPipe implements PipeTransform {

  transform(value: any, campo1: string, campo2: string, arg1: string, arg2: string): any {
    if (!value) {return null; }
    if (!arg1 && !arg2) {return value; }
    if (arg1 && !arg2){
      return  value.filter(singleItem =>
        singleItem[campo1].includes(arg1)
        );
    }else if (!arg1 && arg2){
      return  value.filter(singleItem =>
        singleItem[campo2].includes(arg2)
        );
    }else{
      let filtro1 =   value.filter(singleItem =>
        singleItem[campo2].includes(arg2)
        );
      return  filtro1.filter(singleItem =>
        singleItem[campo1].includes(arg1)
        );
    }
  }
}
