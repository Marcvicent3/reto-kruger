import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(public router: Router) { }

  ingreso() {
    Swal.fire({
      position: 'center', 
      icon: 'success',
      title: 'Bienvenido',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  }
  mensajeExito(mensaje){
    Swal.fire({
      icon: 'success',
      text: mensaje,
      showConfirmButton: false,
      timer: 2000,
      toast: true
    });
  }
  mensajeFracaso(mensaje){
    Swal.fire({
      icon: 'error',
      text: mensaje,
      showConfirmButton: false,
      timer: 3000,
      toast: true
    });
  }
  mensajeAlerta(mensaje){
    Swal.fire({
      icon: 'warning',
      text: mensaje,
      showConfirmButton: false,
      timer: 2800,
      toast: true
    });
  }
  confirmarEliminarGnrl(elemento){
    return new Promise(resolve => {
      Swal.fire({
        title: 'Está seguro de Eliminar ' + elemento + '?',
        text: 'Los datos no podrán ser recuperados',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórrarlo!',
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });
  }
}
