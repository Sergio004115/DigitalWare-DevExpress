import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/interfaces/productos.interface';
// import { Employee } from '../../interfaces/productos.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  
  
  productosForm: any;
  colCountByScreen: any;
  employees: any= [];
  cardCrearProductos: boolean = false;
  mensajeBtn: string = 'Crear Productos';
  mensajeBtnBusqProductos: string = '';
  btnCrear:  boolean = true;
  IdProducto!: number;
  

  constructor( private productosService: ProductosService ) {
    this.traerProductosExistencia();

    
  }
   

  ngOnInit(): void {
    
    this.productosForm = {
      Nombre: '',
      Precio: '',
      Existencias: '',
    };
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3 
    };

  }

  traerProductosExistencia(){
    this.productosService.getProductos()
    .subscribe((productos: Productos) => {  
      this.employees = productos;    
      console.log(this.employees);
    });
  }

  
  onSave(){
    if(this.productosForm.Nombre == '' || this.productosForm.Precio == '' || this.productosForm.Existencias == ''){
      alert('Todos los campos son obligatorios');
    }    
    else{
      const Data = {
        Nombre: this.productosForm.Nombre,
        Precio: this.productosForm.Precio,
        Existencia: this.productosForm.Existencias
      }
      this.productosService.insertNewProducto(Data)
        .subscribe(resp => {
          if(resp == true){
            alert("Producto creado correctamente");
            return this.traerProductosExistencia();
          }          
        }, (err) => {
           alert("Oops, ah ocurrido un error en la creación del producto"); 
        });     
    }
  }

  crearProducto(){
    
    this.cardCrearProductos = !this.cardCrearProductos;
    this.mensajeBtn = this.cardCrearProductos ? 'Productos en Existencia' : 'Crear Productos';
    this.btnCrear = true;
  }

  BuscarInvMinimo(){    
    this.productosService.getProdMinimoPermitido(5)
      .subscribe(resp => {
        this.employees = resp;
      });
  }

  modal(employees: any){
    console.log('lo que contiene el employees', employees);
  }

  onFocusedRowChanged(e: any) {
    console.log(e.row.data);
    if(e.row.data){
      this.cardCrearProductos = true;
      this.IdProducto = e.row.data.IdProducto
      this.productosForm.Nombre = e.row.data.Nombre;
      this.productosForm.Precio = e.row.data.Precio;
      this.productosForm.Existencias = e.row.data.Existencia;
      this.btnCrear = false;
    }
  }

  editarProducto(){
    const Data = {
      Nombre: this.productosForm.Nombre,
      Precio: this.productosForm.Precio,
      Existencia: this.productosForm.Existencias
    }
    this.productosService.updateProducto(this.IdProducto, Data)
      .subscribe(resp => {
        if(resp == true){
          alert("producto actualizado correctamente");
          this.traerProductosExistencia();
        }
      })
  }

  
 

}
