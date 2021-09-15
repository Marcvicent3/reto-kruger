import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(
    private router: Router,
    private usuarioService: EmpleadoService,
    private alertaService: AlertasService
  ) { }

  ngOnInit(): void {
  }

  async logOut(){
    await this.usuarioService.cerrarSesion();
    this.router.navigate(['/login']);
    this.alertaService.mensajeExito('Sesión cerrada correctamente');
  }
}
