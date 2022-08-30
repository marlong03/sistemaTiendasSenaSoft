import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BodegaProductoService {
  postId:String;
    constructor(private http: HttpClient) {
   }
   getBodegaProductoProductos():any{
    return this.http.get("https://sioca2.azurewebsites.net/Prueba1/BodegaProducto/listar");
   }
   postBodegaProducto(data:BodegaProducto){
    this.http
      .post<BodegaProducto>('https://sioca2.azurewebsites.net/Prueba1/BodegaProducto/agregar', data)
      .subscribe((data) => {
        console.log(data)
      });
  }
  deleteBodegaProducto(id:number){
    this.http.delete('https://sioca2.azurewebsites.net/Prueba1/BodegaProducto/eliminar/' + id)
    .subscribe((x)=> console.log(x)
    );
  }
  putBodegaProducto(id:any,data:any){
    this.http.put('https://sioca2.azurewebsites.net/Prueba1/BodegaProducto/editar/'+ id, data)
      .subscribe(data => {console.log(data);}
    );
  }
}
interface BodegaProducto {
  idBodega : {
    id:number
  },
  idProducto:{
    id:number
  }
}
