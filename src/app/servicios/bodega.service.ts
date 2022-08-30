import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BodegaService {
  postId:String;
    constructor(private http: HttpClient) {
   }
   getBodegas():any{
    return this.http.get("https://sioca2.azurewebsites.net/Prueba1/Bodega/listar");
   }
   postBodega(data:Bodega){
    this.http
      .post<Bodega>('https://sioca2.azurewebsites.net/Prueba1/Bodega/agregar', data)
      .subscribe((data) => {
        console.log(data)
      });
  }
  deleteBodega(id:number){
    this.http.delete('https://sioca2.azurewebsites.net/Prueba1/Bodega/eliminar/' + id)
    .subscribe((x)=> console.log(x)
    );
  }
  putBodega(id:any,data:any){
    this.http.put('https://sioca2.azurewebsites.net/Prueba1/Bodega/editar/'+ id, data)
      .subscribe(data => {console.log(data);}
    );
  }
}
interface Bodega {
  id: number,
  Bodega:string
}
