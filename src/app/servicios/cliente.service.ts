import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  postId:String;
    constructor(private http: HttpClient) {
   }
   getClientes():any{
    return this.http.get("https://sioca2.azurewebsites.net/Prueba1/Cliente/listar");
   }
   postCliente(data:Cliente){
    this.http
      .post<Cliente>('https://sioca2.azurewebsites.net/Prueba1/Cliente/agregar', data)
      .subscribe((data) => {
        console.log(data)
      });
  }
  deleteCliente(id:number){
    this.http.delete('https://sioca2.azurewebsites.net/Prueba1/Cliente/eliminar/' + id)
    .subscribe((x)=> console.log(x)
    );
  }
  putCliente(id:any,data:any){
    this.http.put('https://sioca2.azurewebsites.net/Prueba1/Cliente/editar/'+ id, data)
      .subscribe(data => {console.log(data);}
    );
  }
}
interface Cliente {
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

