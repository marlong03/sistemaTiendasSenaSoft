import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DetalleFacturaService {
  postId:String;
    constructor(private http: HttpClient) {
   }
   getDetalleFacturas():any{
    return this.http.get("https://sioca2.azurewebsites.net/Prueba1/DetalleFactura/listar");
   }
   postDetalleFactura(data:any){
    this.http
      .post('https://sioca2.azurewebsites.net/Prueba1/DetalleFactura/agregar', data)
      .subscribe((data) => {
        console.log(data)
      });
  }
  deleteDetalleFactura(id:number){
    this.http.delete('https://sioca2.azurewebsites.net/Prueba1/DetalleFactura/eliminar/' + id)
    .subscribe((x)=> console.log(x)
    );
  }
  putDetalleFactura(id:any,data:any){
    this.http.put('https://sioca2.azurewebsites.net/Prueba1/DetalleFactura/editar/'+ id, data)
      .subscribe(data => {console.log(data);this.getDetalleFacturas();}
    );
  }
}
/* 
interface DetalleFactura {
  "id": 10,
  "cantidad": 1,
  "precio": 100000,
  "idFactura": {
      "id": 1,
      "total": 200,
      "idCliente": {
          "id": 1,
          "nombre": "cliente1",
          "direccion": "calle 200",
          "correo": "cliente1@gmail.com",
          "telefono": "3043453455",
          "idTipo": {
              "id": 1,
              "tipo": "Cedula de ciudadania"
          },
          "password": "123123",
          "numeroIdentificacion": "123323"
      },
      "sucursales": {
          "id": 1,
          "direccion": "calle 45",
          "idTienda": {
              "id": 1,
              "nombre": "koaj",
              "nit": "754"
          }
      }
  },
  "idProducto": {
      "id": 1,
      "idCategoria": {
          "id": 2,
          "categoria": "Camisas"
      },
      "idProveedor": {
          "id": 1,
          "nombre": "Marlon Mendoza",
          "telefono": "3111100022",
          "correo": "dr@gmail.com",
          "direccion": "Calle 6D",
          "idTipo": {
              "id": 1,
              "tipo": "Cedula de ciudadania"
          },
          "numeroIdentificacion": "100000222"
      },
      "nombre": "Camiseta Negras",
      "cantidad": 1255,
      "precioTotal": 20080000,
      "precioUnidad": 16000
  }
}

 */