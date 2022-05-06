import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientesForm: any;
  colCountByScreen: any;
  employees: any= [];
  mensajeBtn: string = 'Nuevo Cliente';
  cardCrearClientes: boolean = false;

  constructor( private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.traerClientes();
    this.clientesForm = {
      Nombres: '',
      Apellidos: '',
      Telefono: '',      
      NroIdentificacion: '',    
      Nacimiento: '',
      Direccion: ''
    };
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3 
    };
  }


  crearClientes(){
    this.cardCrearClientes = !this.cardCrearClientes;
    this.mensajeBtn = this.cardCrearClientes ? 'Lista Clientes' : 'Nuevo Cliente';
  }

  onSave(){
    if(this.clientesForm.Nombres == '' || this.clientesForm.Apellidos == '' || this.clientesForm.Telefono == '' || this.clientesForm.Nacimiento == '' || this.clientesForm.Direccion == ''){
     alert('Todos los campos son obligatorios');
    }else{
      const Data = {
        Nombres: this.clientesForm.Nombres,
        Apellidos:  this.clientesForm.Apellidos,
        Telefono: this.clientesForm.Telefono,
        TipoIdentificacion: this.clientesForm.identificacion,
        NroIdentificacion: this.clientesForm.NroIdentificacion,
        FechaNacimiento: this.clientesForm.Nacimiento,
        DireccionResidencia: this.clientesForm.Direccion,
      }
      this.clientesService.insertNewCliente(Data)
      .subscribe((resp: any) => {
        if(resp == true){
          alert("Cliente creado correctamente");
        }          
      }, (err) => {
         alert("Oops, ah ocurrido un error en la creación del Cliente"); 
      }); 
    }
  }

  traerClientes(){
    this.clientesService.getClientes()
      .subscribe(resp => {
        this.employees = resp;
        console.log(this.employees);
      })
  }




}
