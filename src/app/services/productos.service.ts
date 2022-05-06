import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Productos } from '../interfaces/productos.interface';

const baseUrl = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }


  getProductos(){
    const url = `${baseUrl}Productos/getProductos`;
    return this.http.get<Productos>(url);
  }

  getProdMinimoPermitido(minimoPermitido: number){
    const url = `${baseUrl}Productos/getMinimoPermitido?MinimoPermitido=${minimoPermitido}`;
    return this.http.get(url);
  }

  insertNewProducto(data: Productos){
    const url = `${baseUrl}Productos/InsertProductos`;
    return this.http.post<Productos>(url, data)
  }

  updateProducto(IdProducto: number, data: Productos){
    const url = `${baseUrl}Productos/PutUpdateProducto?IdProducto=${IdProducto}`;
    return this.http.put(url, data);
  }


}
