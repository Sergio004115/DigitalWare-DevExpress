import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  employees: any= [];
  colCountByScreen: any;
  ventasForm: any;
  cardCrearVentas: boolean = true;
  cardClientesNoMayores: boolean = false;
  cardAgrupadoProductos: boolean = false;
  cardfechaEstimada: boolean = false;
  fechaEstimada: Date = new Date();

  constructor(private ventasService: VentasService) { }

  ngOnInit(): void {
    this.ventasForm = {
      Cliente: '',
      CodigoProducto: '',
      CantidadProducto: '',
      TotalVenta: '',
    };
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3 
    };
  }

  BuscarComprasClientes(){
    this.cardAgrupadoProductos = false;
    this.cardClientesNoMayores = true;
    this.cardCrearVentas = false;
    this.ventasService.getclientesNoMayorAños()
      .subscribe(resp => {
        this.employees = resp;
        console.log(this.employees);
      });
  }
  
  totalComprasPorAnio(){
    this.cardAgrupadoProductos = true;
    this.cardClientesNoMayores = false;
    this.cardCrearVentas = false;
    this.ventasService.getTotalComprasPorAnio()
      .subscribe(resp => {
        this.employees = resp;
        console.log(this.employees);
      });
  }

  generarVenta(){
    this.cardCrearVentas = true;
    this.cardClientesNoMayores = false;
    this.cardAgrupadoProductos = false;
  }

  onSave(){
    if(this.ventasForm.CodigoProducto == '' || this.ventasForm.CantidadProducto == '' || this.ventasForm.TotalVenta == ''){
      alert('Todos los campos son obligatorios');
    }else{
      const Data = {
        Cliente: this.ventasForm.Cliente,
        IdProducto: this.ventasForm.CodigoProducto,
        CodigoProducto: this.ventasForm.CodigoProducto,
        CantidadProducto: this.ventasForm.CantidadProducto,
        TotalVenta: this.ventasForm.TotalVenta
      }
      this.ventasService.insertNewVenta(Data)
        .subscribe(resp => {
          if(resp == true){
            alert('Venta generada correctamente');  
            this.totalComprasPorAnio()
                      
          }
        }, (err) => {
          alert('Error al generar venta');
        });
    }
  }

  fechaEstimadaVenta(){
    this.cardfechaEstimada = true;
    this.cardCrearVentas = false;
    this.cardClientesNoMayores = false;
    this.cardAgrupadoProductos = false;
    this.ventasService.getFechaEstimadaVenta()
      .subscribe(resp => {
        this.employees = resp;     
        this.estimarCompra(this.employees)   
        console.log(this.employees);
      });
  }

  estimarCompra(employees: any){
    let anio = Number(employees[0].UltimaCompra.substring(0, 4));
    let mes = Number(employees[0].UltimaCompra.substring(5, 7));
    let dia = Number(employees[0].UltimaCompra.substring(8, 10));    
    let fechaAjustada = new Date(anio, mes, dia);
    let resultadoAjustado = fechaAjustada = new Date( anio, fechaAjustada.getMonth() - 1, dia );
    let fechaEstimadaCompra = new Date(fechaAjustada.setDate(fechaAjustada.getDate() + employees[0].diferenciaEntreCompras));

    this.fechaEstimada= fechaEstimadaCompra;
  }


}
