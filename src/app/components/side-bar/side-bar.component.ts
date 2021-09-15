import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  public desactivateUsers:boolean = true;
  public name: string;

  constructor(
    public usuarioService: EmpleadoService
    ) { }

  ngOnInit(): void {
    if (this.usuarioService.empleado.Identificador == 'USER'){
      this.desactivateUsers = false;
    }
    this.getName();
  }

  getName(){
    const nameSplit = this.usuarioService.empleado.Nombres.split(' ');
    const lastNameSplit = this.usuarioService.empleado.Apellidos.split(' ');
    this.name = nameSplit[0] + ' ' + lastNameSplit[0];
  }
}
