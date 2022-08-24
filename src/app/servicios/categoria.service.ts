import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  postId:String;
    constructor(private http: HttpClient) {
   }
   getCategorias():any{
    return this.http.get("https://sioca2.azurewebsites.net/Prueba1/Categoria/listar");
   }
   postCategoria(data:Categoria){
    this.http
      .post<Categoria>('https://sioca2.azurewebsites.net/Prueba1/Categoria/agregar', data)
      .subscribe((data) => {
        console.log(data)
      });
  }
  deleteCategoria(id:number){
    this.http.delete('https://sioca2.azurewebsites.net/Prueba1/Categoria/eliminar/' + id)
    .subscribe((x)=> console.log(x)
    );
  }
  putCategoria(id:any,data:any){
    this.http.put('https://sioca2.azurewebsites.net/Prueba1/Categoria/editar/'+ id, data)
      .subscribe(data => {console.log(data);this.getCategorias();}
    );
  }
}
interface Categoria {
  id: number,
  categoria:string
}
