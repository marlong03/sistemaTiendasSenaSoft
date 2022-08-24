import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  postId:String;
    constructor(private http: HttpClient) {
   }
   getProveedors():any{
    return this.http.get("https://sioca2.azurewebsites.net/Prueba1/Proveedor/listar");
   }
   postProveedor(data:Proveedor){
    this.http
      .post<Proveedor>('https://sioca2.azurewebsites.net/Prueba1/Proveedor/agregar', data)
      .subscribe((data) => {
        console.log(data)
      });
  }
  deleteProveedor(id:number){
    this.http.delete('https://sioca2.azurewebsites.net/Prueba1/Proveedor/eliminar/' + id)
    .subscribe((x)=> console.log(x)
    );
  }
  putProveedor(id:any,data:any){
    this.http.put('https://sioca2.azurewebsites.net/Prueba1/Proveedor/editar/'+ id, data)
      .subscribe(data => {console.log(data);this.getProveedors();}
    );
  }
}
interface Proveedor {
  id: number,
  nombre:string,
  telefono:string,
  correo:string,
  direccion:string,
  idTipo:{
    id:number,
    
  },
  numeroIdentificacion:string
}
