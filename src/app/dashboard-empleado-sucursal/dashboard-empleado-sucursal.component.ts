import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';

@Component({
  selector: 'app-dashboard-empleado-sucursal',
  templateUrl: './dashboard-empleado-sucursal.component.html',
  styleUrls: ['./dashboard-empleado-sucursal.component.css']
})
export class DashboardEmpleadoSucursalComponent implements OnInit {
  abrir = false; 
  modalDisplay:string;
  listaProductos:any = [];
  palabraFiltrado:string = "a";
  listaProductosMostrar:any = [];
  /* no me muestra la lista de productos sinque ocuyrra una accion primero */
  cambiarLista(){
  let lista = this.listaProductos.filter((x:any) => (x.nombre).toLowerCase().includes(this.palabraFiltrado))    
      console.log(this.palabraFiltrado);
      this.listaProductosMostrar = lista; 
  }
  abrirModal(e:any){
    this.modalDisplay = 'block';
    console.log(this.modalDisplay);
    /* console.log(this.listaProductos); */
    console.log(this.listaProductosMostrar);
    
    }
    cerrarModal(){
      this.modalDisplay = "none";
    }
    constructor(private productoService: ProductoService ) { }
    ngOnInit(): void {
      this.listaProductos = this.productoService.getProductos().subscribe((x:any)=>this.listaProductos = x)
      
    }

}
