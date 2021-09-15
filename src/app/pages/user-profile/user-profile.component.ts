import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/class/usuario';
import { Usuarios } from 'src/app/interfaces/interfacesUsuarios';
import { AlertasService } from 'src/app/services/alertas.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public employees: Usuarios[]=[];
  public employeeNew: Usuario;


  constructor(
    private empleadoService: EmpleadoService,
    private alertas: AlertasService,
    private validaciones: ValidacionesService
  ) { 
    this.employeeNew = new Usuario();
  }


  ngOnInit(): void {
    if (this.empleadoService.verificarActivo()){
      this.loadEmployees();
    }
  }

  async loadEmployees(){
    this.employeeNew.Id_Usuario = this.empleadoService.empleado.Id_Usuario;
    this.employeeNew.Identificador = this.empleadoService.empleado.Identificador;
    this.employeeNew.Nombres = this.empleadoService.empleado.Nombres;
    this.employeeNew.Apellidos = this.empleadoService.empleado.Apellidos;
    this.employeeNew.Cedula = this.empleadoService.empleado.Cedula;
    this.employeeNew.Correo_Electronico = this.empleadoService.empleado.Correo_Electronico;
    this.employeeNew.Fecha_Nacimiento = this.empleadoService.empleado.Fecha_Nacimiento;
    this.employeeNew.Domicilio = this.empleadoService.empleado.Domicilio;
    this.employeeNew.Celular = this.empleadoService.empleado.Celular;
    this.employeeNew.Estado_Vacunacion = this.empleadoService.empleado.Estado_Vacunacion;
    this.employeeNew.Tipo_Vacuna = this.empleadoService.empleado.Tipo_Vacuna;
    this.employeeNew.Fecha_Vacunacion = this.empleadoService.empleado.Fecha_Vacunacion;
    this.employeeNew.Numero_Dosis = this.empleadoService.empleado.Numero_Dosis;
    this.employeeNew.Usuario = this.empleadoService.empleado.Usuario;
    this.employeeNew.Password = atob(this.empleadoService.empleado.Password);
    this.vaccinationState();
  }

  vaccinationState(){
    if (this.employeeNew.Estado_Vacunacion == false){
      this.employeeNew.Tipo_Vacuna = null;
      this.employeeNew.Fecha_Vacunacion = null;
      this.employeeNew.Numero_Dosis = null;
    }
  }

  async dataValidation(){
    this.vaccinationState();
    if (!await this.validaciones.nameValidation(this.employeeNew.Nombres)){
      this.alertas.mensajeAlerta('Por favor ingrese Nombres del Empleado válidos');
    }else if (!await this.validaciones.nameValidation(this.employeeNew.Apellidos)){
      this.alertas.mensajeAlerta('Por favor ingrese Apellidos del Empleado válidos');
    }else if (!await this.validaciones.idValidation(this.employeeNew.Cedula, this.employeeNew.Cedula)){
      this.alertas.mensajeAlerta('Por favor ingrese Cédula del Empleado válidos');
    }else if (!await this.validaciones.esEmailValido(this.employeeNew.Correo_Electronico)){
      this.alertas.mensajeAlerta('Por favor ingrese Correo del Empleado válidos');
    }else {
      this.completeEmptyFields();
    }
  }

  completeEmptyFields() { // Se rellenan solo los campos nulos
    if (this.employeeNew.Fecha_Nacimiento === undefined || this.employeeNew.Fecha_Nacimiento === '') {
      this.employeeNew.Fecha_Nacimiento = null;
    }else if (this.employeeNew.Celular === undefined || this.employeeNew.Celular === '') {
      this.employeeNew.Celular = null;
    }else if (this.employeeNew.Estado_Vacunacion === undefined) {
      this.employeeNew.Estado_Vacunacion = null;
    }else if (this.employeeNew.Tipo_Vacuna === undefined || this.employeeNew.Tipo_Vacuna === '') {
      this.employeeNew.Tipo_Vacuna = null;
    }else if (this.employeeNew.Numero_Dosis === undefined || this.employeeNew.Numero_Dosis === '') {
      this.employeeNew.Numero_Dosis = null;
    }
    this.newEmployee();
  }

  async newEmployee(){
    const resultEst = await this.empleadoService.updateEmpleado(this.employeeNew);
    if (resultEst != false){
      if (this.employeeNew.Id_Usuario === null || this.employeeNew.Id_Usuario === undefined || this.employeeNew.Id_Usuario === ''){
        this.employeeNew.Id_Usuario = resultEst['id_nuevo'];
      }
      this.alertas.mensajeExito('Empleado actualizado Correctamente');
    }
  }

}
