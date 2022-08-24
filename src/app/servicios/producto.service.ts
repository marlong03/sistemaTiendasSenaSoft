import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  postId:String;
  constructor(private http: HttpClient) {

   }
   getProductos():any{
    return this.http.get("https://sioca2.azurewebsites.net/Prueba1/Producto/listar");

   }
   postProducto(data:Producto){
    this.http
      .post<Producto>('https://sioca2.azurewebsites.net/Prueba1/Producto/agregar', data)
      .subscribe((data) => {
        console.log(data)
      });
  }
  deleteProducto(id:number){
    this.http.delete('https://sioca2.azurewebsites.net/Prueba1/Producto/eliminar/' + id)
    .subscribe((x)=> console.log(x)
    );
  }
  putProducto(id:any,data:any){
    this.http.put('https://sioca2.azurewebsites.net/Prueba1/Producto/editar/'+ id, data)
      .subscribe(data => {console.log(data);this.getProductos();}
    );
  }
   
 
}
interface Producto {
  cantidad:number,
  id: number,
  idCategoria:{
    id: number
  },
  idProveedor:{
    id: number
  },
  nombre: string,
  precioTotal: number,
  precioUnidad: number,
}
