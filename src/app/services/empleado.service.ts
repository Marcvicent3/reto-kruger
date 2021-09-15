import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Usuario } from '../class/usuario';
import { AlertasService } from './alertas.service';
import { GeneralService } from './general.service';

const rutaHttp = environment.httpRequests;

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  public empleado: Usuario;
  constructor(
    public router: Router,
    public general: GeneralService,
    public alertas: AlertasService
  ) {
    this.empleado = new Usuario();
  }


  getEmpleados(){
    return new Promise(resolve => {
      this.general.getTransaction(rutaHttp.empleadoListar)
      .subscribe(resp => {
        if (resp['encontrado'] == true){
          resolve(resp);
        }else{
          resolve(false);
        }
      }, () => {           // error
        this.alertas.mensajeFracaso('Error al listar Empleados');
        resolve('error');
      });
    });
  }

  updateEmpleado(data){
    return new Promise(resolve => {
      this.general.postTransaction(rutaHttp.empleadoIngresar, data)
      .subscribe(resp => {
        resolve(resp);
      }, () => {              // error
        this.alertas.mensajeFracaso('Error al procesar Empleado, por favor intente nuevamente');
        resolve(false);
      });
    });
  }

  searchEmpleado(data){
    return new Promise(resolve => {
      this.general.postTransaction(rutaHttp.empleadoBuscar, data)
      .subscribe(resp => {
        if (resp['encontrado'] === true){
          resolve(resp);
        }else{
          resolve(false);
        }
      }, () => {              // error
        this.alertas.mensajeFracaso('Error al Buscar Empleado');
        resolve(false);
      });
    });
  }

  deleteEmpleado(data){
    return new Promise(resolve => {
      this.general.postTransaction(rutaHttp.empleadoEliminar, data)
      .subscribe(resp => {
        if (resp['error'] === false){
          this.alertas.mensajeExito(resp['mensaje'])
          resolve(true);
        }
      }, () => {              // error
        this.alertas.mensajeFracaso('Error al Eliminar Empleado');
        resolve(false);
      });
    });
  }

  async verificarActivo(){
    const verif = await this.obtenerStorage();
    if (!verif){
      this.router.navigate(['/login']);
    }
    return verif;
  }
  
  async verificarLogeado(){
    return await this.obtenerStorage();
  }

  login(data){
    return new Promise(resolve => {
      this.general.postTransaction(rutaHttp.usuarioLogin, data)
        .subscribe(resp => {
          if (resp['error'] === true){
            this.alertas.mensajeFracaso(resp['mensaje']);
            resolve(false);
          }else{
            resolve(resp);
          }
        }, () => {           // error
          this.alertas.mensajeFracaso('Error al iniciar sesión.');
          resolve(false);
        });
    });
  }
  
  encode(text: string){
    return btoa(text);
  }

  decode(text: string){
    return atob(text);
  }

  guardarStorage(datos) {
    localStorage.setItem('trash', this.encode(JSON.stringify(datos))); // Utilizacion de variable de sesión
  }

  async obtenerStorage() {
    if (this.existeLocalStorage()){
      const guardadoLocal = localStorage.getItem('trash');
      const obtenerDecodificado = this.decode(guardadoLocal);
      this.empleado = JSON.parse(obtenerDecodificado);
      return true;
    }else{
      return false;
    }
  }

  existeLocalStorage() {
    if (localStorage.getItem('trash') || localStorage.getItem('trash') !== null || 'trash' in localStorage) {
      return true;
    } else {
      return false;
    }
  }


  async cerrarSesion() {
    localStorage.removeItem('trash');
    this.empleado = null;
    location.reload();
  }
}
