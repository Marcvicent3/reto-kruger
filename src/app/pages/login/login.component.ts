import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: string;
  public password: string;

  constructor(
    public usuarioService: EmpleadoService,
    private router: Router,
    public alertas: AlertasService
  )
    { }

  ngOnInit(): void {
    if (this.usuarioService.verificarActivo()){
      this.router.navigate(['/dashboard']);
    };

    this.usuario = '';
    this.password = '';
  }

  async login(){
    const data = { Usuario: this.usuario, Password: this.password};
    const resultConsult = await this.usuarioService.login( data );
    if (resultConsult != false){
      this.usuarioService.guardarStorage(resultConsult['informacion']);
      this.router.navigate(['/dashboard']);
      await this.alertas.ingreso();
    }else{
      this.router.navigate(['/login']);
      this.alertas.mensajeFracaso('Usuario/Contraseña Incorrectos');
    }
  }
}
