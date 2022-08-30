import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  postId:String;
    constructor(private http: HttpClient) {
   }
   getFacturas():any{
    return this.http.get("https://sioca2.azurewebsites.net/Prueba1/Factura/listar");
   }
   postFactura(data:Factura){
    this.http
      .post<Factura>('https://sioca2.azurewebsites.net/Prueba1/Factura/agregar', data)
      .subscribe((data) => {
        console.log(data)
      });
  }
  deleteFactura(id:number){
    this.http.delete('https://sioca2.azurewebsites.net/Prueba1/Factura/eliminar/' + id)
    .subscribe((x)=> console.log(x)
    );
  }
  putFactura(id:any,data:any){
    this.http.put('https://sioca2.azurewebsites.net/Prueba1/Factura/editar/'+ id, data)
      .subscribe(data => {console.log(data);}
    );
  }
}
interface Factura {
  id: number;
    total: number;
    idCliente: {
        id: number;
    };
    sucursales: {
        id: number;
    };
}
