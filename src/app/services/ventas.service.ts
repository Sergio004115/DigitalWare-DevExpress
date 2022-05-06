import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComprasClientesNoMayoresEdad } from '../interfaces/comprasClientesNoMayor.interface';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) { }


  getclientesNoMayorAños(){
    const url = `${baseUrl}Ventas/getClientesNoMayor`;
    return this.http.get<ComprasClientesNoMayoresEdad>(url);
  }

  getTotalComprasPorAnio(){
    const url = `${baseUrl}Ventas/getTotalVentaPorProducto`;
    return this.http.get<any>(url);
  }

  insertNewVenta(data: any){
    const url = `${baseUrl}Ventas/InsertNewVenta`;
    return this.http.post(url, data);

  }

  getFechaEstimadaVenta(){
    const url = `${baseUrl}Ventas/getEstimacionVentar`;
    return this.http.get<any>(url);
  }


}
