import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/class/usuario';
import { Usuarios } from 'src/app/interfaces/interfacesUsuarios';
import { AlertasService } from 'src/app/services/alertas.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  public employees: Usuarios[] = [];
  public employeeNew: Usuario;
  public employeesNumber: number;

  public modifyFlag: boolean;
  public newFlag: boolean;
  public compareId: string;
  public selectFilter: string;
  public vaccinationState: string;
  public vaccinationKind: string;

  constructor(
    private empleadoService: EmpleadoService,
    private alertas: AlertasService,
    private validaciones: ValidacionesService
  ) {
    this.employeeNew = new Usuario();
  }

  ngOnInit(): void {
    if (this.empleadoService.verificarActivo()) {
      this.obtenerEmpleados();
    }
  }

  showTab(btn, tab) {
    this.limpiarDatos();
    let i;
    let tabContent;
    let buttons;
    tabContent = document.getElementsByClassName('tab');
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = 'none';
    }

    buttons = document.getElementsByClassName('btn-change');

    for (i = 0; i < buttons.length; i++) {
      if (i === btn) {
        buttons[i].classList.add('btn-selected');
      } else {
        buttons[i].classList.remove('btn-selected');
      }
    }

    document.getElementById(tab).style.display = 'block';
  }

  newUser() {
    this.showTab(1, 'set-user');
    this.modifyFlag = true;
    this.newFlag = true;
  }

  async obtenerEmpleados() {
    this.selectFilter = '';
    this.vaccinationState = '';
    this.vaccinationKind = '';
    const resp = await this.empleadoService.getEmpleados();
    if (resp != false && resp != 'error') {
      this.employees = resp['empleados'];
      this.employeesNumber = this.employees.length;
    } else if (resp != 'error') {
      this.alertas.mensajeFracaso('Actualmente No existen Estudiantes ingresados');
      this.employeesNumber = 0;
    }
  }

  async loadEmployees(option, employeeRecib: Usuarios) {
    this.showTab(1, 'set-user');
    this.modifyFlag = option === 'show' ? false : true;
    this.employeeNew.Id_Usuario = employeeRecib.Id_Usuario;
    this.employeeNew.Identificador = employeeRecib.Identificador;
    this.employeeNew.Nombres = employeeRecib.Nombres;
    this.employeeNew.Apellidos = employeeRecib.Apellidos;
    this.employeeNew.Cedula = employeeRecib.Cedula;
    this.employeeNew.Correo_Electronico = employeeRecib.Correo_Electronico;
    this.employeeNew.Fecha_Nacimiento = employeeRecib.Fecha_Nacimiento;
    this.employeeNew.Domicilio = employeeRecib.Domicilio;
    this.employeeNew.Celular = employeeRecib.Celular;
    this.employeeNew.Estado_Vacunacion = employeeRecib.Estado_Vacunacion;
    this.employeeNew.Tipo_Vacuna = employeeRecib.Tipo_Vacuna;
    this.employeeNew.Numero_Dosis = employeeRecib.Numero_Dosis;
    this.employeeNew.Usuario = employeeRecib.Usuario;
    this.employeeNew.Password = atob(employeeRecib.Password);
    this.compareId = employeeRecib.Cedula;
  }

  async dataValidation() {
    if (!await this.validaciones.nameValidation(this.employeeNew.Nombres)) {
      this.alertas.mensajeAlerta('Por favor ingrese Nombres del Empleado válidos');
    } else if (!await this.validaciones.nameValidation(this.employeeNew.Apellidos)) {
      this.alertas.mensajeAlerta('Por favor ingrese Apellidos del Empleado válidos');
    } else if (!await this.validaciones.idValidation(this.employeeNew.Cedula, this.compareId)) {
      this.alertas.mensajeAlerta('Por favor ingrese Cédula del Empleado válidos');
    } else if (!await this.validaciones.esEmailValido(this.employeeNew.Correo_Electronico)) {
      this.alertas.mensajeAlerta('Por favor ingrese Correo del Empleado válidos');
    } else {
      if (this.newFlag) {
        this.verifyEmployee();
      } else {
        this.completeEmptyFields();
      }
    }
  }

  completeEmptyFields() { // Se rellenan solo los campos nulos
    if (this.employeeNew.Fecha_Nacimiento === undefined || this.employeeNew.Fecha_Nacimiento === '') {
      this.employeeNew.Fecha_Nacimiento = null;
    } else if (this.employeeNew.Celular === undefined || this.employeeNew.Celular === '') {
      this.employeeNew.Celular = null;
    } else if (this.employeeNew.Estado_Vacunacion === undefined) {
      this.employeeNew.Estado_Vacunacion = null;
    } else if (this.employeeNew.Tipo_Vacuna === undefined || this.employeeNew.Tipo_Vacuna === '') {
      this.employeeNew.Tipo_Vacuna = null;
    } else if (this.employeeNew.Numero_Dosis === undefined || this.employeeNew.Numero_Dosis === '') {
      this.employeeNew.Numero_Dosis = null;
    }
    this.newEmployee();
  }



  async verifyEmployee() {
    const data = { Cedula: this.employeeNew.Cedula };
    const result = await this.empleadoService.searchEmpleado(data);
    if (result) {
      this.alertas.mensajeFracaso('La cédula de Empleado ingresada ya existe, intente con otra CI');
    } else {
      this.newEmployee();
    }
  }

  generateUsernamePassWord() {
    const splitNames = this.employeeNew.Nombres.split(' ');
    const splitLastNames = this.employeeNew.Apellidos.split(' ');
    const userName = splitNames[0].substring(0, 1) + splitNames[1].substring(0, 1) + splitLastNames[0].substring(0, 1) + splitLastNames[1].substring(0, 1);
    this.employeeNew.Usuario = userName;
    this.employeeNew.Password = this.employeeNew.Cedula;
  }
  async newEmployee() {
    this.generateUsernamePassWord();
    const resultEst = await this.empleadoService.updateEmpleado(this.employeeNew);
    if (resultEst != false) {
      if (this.employeeNew.Id_Usuario === null || this.employeeNew.Id_Usuario === undefined || this.employeeNew.Id_Usuario === '') {
        this.employeeNew.Id_Usuario = resultEst['id_nuevo'];
      }
      this.alertas.mensajeExito('Empleado actualizado Correctamente');
      this.obtenerEmpleados();
      this.newFlag = false;
    }
  }

  async deleteEmployee(employeeRecib: Usuario, indice) {
    if (await this.alertas.confirmarEliminarGnrl('Usuario')) {
      const resp = await this.empleadoService.deleteEmpleado(employeeRecib);
      if (resp != false && resp != 'error') {
        this.employees.splice(indice, 1);
      }
    }
  }

  limpiarDatos() {
    this.selectFilter = '';
    this.vaccinationState = '';
    this.vaccinationKind = '';
    this.employeeNew.Id_Usuario = null;
    this.employeeNew.Nombres = null;
    this.employeeNew.Apellidos = null;
    this.employeeNew.Cedula = null;
    this.employeeNew.Correo_Electronico = null;
    this.employeeNew.Fecha_Nacimiento = null;
    this.employeeNew.Domicilio = null;
    this.employeeNew.Celular = null;
    this.employeeNew.Estado_Vacunacion = null;
    this.employeeNew.Tipo_Vacuna = null;
    this.employeeNew.Fecha_Vacunacion = null;
    this.employeeNew.Numero_Dosis = null;
    this.employeeNew.Usuario = null;
    this.employeeNew.Password = null;
    this.compareId = null
    this.newFlag = false;
  }


}
