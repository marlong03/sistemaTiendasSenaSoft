import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class Sucursaleservice {
  postId:String;
    constructor(private http: HttpClient) {
   }
   getSucursales():any{
    return this.http.get("https://sioca2.azurewebsites.net/Prueba1/Sucursal/listar");
   }
   postSucursal(data:Sucursal){
    this.http
      .post<Sucursal>('https://sioca2.azurewebsites.net/Prueba1/Sucursal/agregar', data)
      .subscribe((data) => {
        console.log(data)
      });
  }
  deleteSucursal(id:number){
    this.http.delete('https://sioca2.azurewebsites.net/Prueba1/Sucursal/eliminar/' + id)
    .subscribe((x)=> console.log(x)
    );
  }
  putSucursal(id:any,data:any){
    this.http.put('https://sioca2.azurewebsites.net/Prueba1/Sucursal/editar/'+ id, data)
      .subscribe(data => {console.log(data);}
    );
  }
}
interface Sucursal {
  id:number,
  nombre:string,
  direccion:string,
  correo:string,
  telefono:string,
  numeroIdentificacion:string,
  password:string,
  idTipo:{
    id:number // esto depornto no se envie asi
  }
}

