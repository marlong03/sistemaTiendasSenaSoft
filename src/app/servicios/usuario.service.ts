import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  postId:String;
    constructor(private http: HttpClient) {
   }
   getUsuarios():any{
    return this.http.get("https://sioca2.azurewebsites.net/Prueba1/Usuario/listar");
   }
   getUsuariosLogin(data:any):any{
    return this.http.post("https://sioca2.azurewebsites.net/Prueba1/Usuario/validar",data);
   }
   postUsuario(data:Usuario){
    this.http
      .post<Usuario>('https://sioca2.azurewebsites.net/Prueba1/Usuario/agregar', data)
      .subscribe((data) => {
        console.log(data)
      });
  }
  deleteUsuario(id:number){
    this.http.delete('https://sioca2.azurewebsites.net/Prueba1/Usuario/eliminar/' + id)
    .subscribe((x)=> console.log(x)
    );
  }
  putUsuario(id:any,data:any){
    this.http.put('https://sioca2.azurewebsites.net/Prueba1/Usuario/editar/'+ id, data)
      .subscribe(data => {console.log(data);}
    );
  }
}
interface Usuario {
  id: number,
  Usuario:string
}
