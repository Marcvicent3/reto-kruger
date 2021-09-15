<?php
defined('BASEPATH') or exit('No direct script access allowed');
require_once(APPPATH . '/libraries/REST_Controller.php');

use Restserver\libraries\REST_Controller;

class EmpleadoService extends REST_Controller
{
    public function __construct(){
        header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
        header("Access-Control-Allow-Origin: *");
        parent::__construct();
        $this->load->database();
    }

    public function index_get(){
        $respuesta = 'EmpleadoService-index_get()';
        $this->response($respuesta);
    }

    // TODOS LOS MOSTRAR EN ESTA SECCIÓN
    public function empleadoListar_get(){
        $this->db->SELECT('*');
        $this->db->from('usuario');
        $this->db->where('Identificador', 'USER');
        $this->db->order_by('Apellidos ASC');

        $queryEmpleado = $this->db->get();

        if (isset($queryEmpleado)){
            $cantidadFilas = $queryEmpleado->num_rows();
            if($cantidadFilas > 0){
                $respuesta = array(
                    'encontrado' => true,
                    'empleados' => $queryEmpleado->result_array()
                );
            }else{
                $respuesta = array(
                    'encontrado' => false
                );
            }

            $this->response($respuesta);
        }
    }

    // TODOS LOS INGRESAR EN ESTA SECCIÓN

    public function empleadoIngresar_post(){
        $data = $this->post();
        $id = null;

        $datos = [
            'Identificador' => 'USER',
            'Nombres' => $data['Nombres'],
            'Apellidos' => $data['Apellidos'],
            'Cedula' => $data['Cedula'],
            'Correo_Electronico' => $data['Correo_Electronico'],
            'Fecha_Nacimiento' => $data['Fecha_Nacimiento'],
            'Domicilio' => $data['Domicilio'],
            'Celular' => $data['Celular'],
            'Estado_Vacunacion' => $data['Estado_Vacunacion'],
            'Tipo_Vacuna' => $data['Tipo_Vacuna'],
            'Fecha_Vacunacion' => $data['Fecha_Vacunacion'],
            'Numero_Dosis' => $data['Numero_Dosis'],
            'Usuario' => $data['Usuario'],
            'Password' => base64_encode($data['Password'])
        ];

        if(isset($data['Id_Usuario'])){
            $id = $data['Id_Usuario'];
        }

        if (($id == null)) {
            $this->db->insert('usuario', $datos);
            $nuevoId = $this->db->insert_id();
            $respuesta = array(
                'error' => false,
                'mensaje' => 'Usuario guardado correctamente',
                'id_nuevo' => $nuevoId
            );
            $this->response($respuesta);
        } else {
            $this->db->where('Id_Usuario', $id);
            $this->db->update('usuario', $datos);
                $respuesta = array(
                    'error' => false,
                    'mensaje' => 'Usuario actualizada correctamente'
                );
            $this->response($respuesta);
        }
    }

    // TODOS LOS ELIMINAR EN ESTA SECCIÓN

    public function empleadoEliminar_post(){
        $data = $this->post();
        $this->db->where('Id_Usuario', $data['Id_Usuario']);  // delete en tabla cuento
        $this->db->delete('usuario');
        
        $respuesta = array(
            'error' => false,
            'mensaje' => 'El Empleado se eliminó correctamente'
        );
        $this->response($respuesta);
    }

    //****************************************************** 
    //********** TODOS LOS BUSCAR EN ESTA SECCIÓN ********** 

    public function empleadoBuscar_post(){
        $data = $this->post();

        $this->db->SELECT('Id_Usuario');
        $this->db->from('usuario');
        $this->db->where('Cedula', $data['Cedula']);
        $queryEmpleado = $this->db->get();

        if(isset($queryEmpleado)){
            $cantidadFilas = $queryEmpleado->num_rows();
            if($cantidadFilas > 0){
                $Empleado = $queryEmpleado->result_array();
                $respuesta = array(
                    'encontrado' => true,
                    'Id_Usuario' => $Empleado[0]['Id_Usuario']
                );
            }else{
                $respuesta = array(
                    'encontrado' => false
                );
            }
        }
        $this->response($respuesta);
    }

    //****************************************************** 
    //********** TODOS LOS otros metodos EN ESTA SECCIÓN ********** 

    public function usuarioLogin_post(){
        $data = $this->post();

        if (!isset($data['Usuario']) or !isset($data['Password'])) {
        $respuesta = array(
            'error' => true,
            'mensaje' => 'Llene todos los campos antes de continuar.'
        );
        $this->response($respuesta, REST_Controller::HTTP_BAD_REQUEST);
        return;
        }


        $password = base64_encode($data['Password']);
        $query = $this->db->query("SELECT * FROM usuario WHERE Usuario = BINARY '{$data['Usuario']}' AND Password = BINARY '{$password}'");
        $usuario = $query->row();

        if (!isset($usuario)) {
            $respuesta = array(
            'error' => true,
            'mensaje' => 'Usuario y/o password no son validos'
            );
            $this->response($respuesta);
            return;
        }

        $respuesta = array(
            'error' => false,
            'informacion' => $usuario
        );
        $this->response($respuesta);
    }
}
