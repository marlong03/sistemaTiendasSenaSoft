import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../servicios/producto.service';

@Component({
  selector: 'app-dashboard-empleado-sucursal',
  templateUrl: './dashboard-empleado-sucursal.component.html',
  styleUrls: ['./dashboard-empleado-sucursal.component.css']
})
export class DashboardEmpleadoSucursalComponent implements OnInit {
  abrir = false; 
  modalDisplay:string;
  modalDisplay1:string;
  userLocalStorage = JSON.parse(localStorage.getItem("usuarioConectado") ||  ""); 
  listaProductos:any = [];
  idSeleccionado:number;
  productoTraidoPorId:any;
  listaProductosEnFactura:any = [];
onana2:any; 
  obtenerValorIna2(e:any){

    console.log(e);
    this.onana2 = e;
    return e
    
  }
  abrirModal(e:any){
    /* console.log("aqui el 1");
    console.log(this.modalDisplay1); */

    
    if(this.modalDisplay=="block"){
    this.modalDisplay = 'none';
    }else{

      this.modalDisplay = 'block';
    }
    console.log(this.modalDisplay);
  }
  cerrarModal(){
    this.modalDisplay = "none";
  }
  existeUnUsuario(){
    let user = localStorage.getItem("usuarioConectado");
    if(user == null || user == ""){
      return false;
    } else{
      return true;
    }
  }
  cerrarSesion(){
    localStorage.removeItem("usuarioConectado");
    this.router.navigate(['/']);
  }
  vibro = ""

  btnCarrito:any;
  seleccionarProductoProIdBtn(e:any){
    console.log(this.listaProductos);
    
    this.idSeleccionado = parseInt(e.path[2].childNodes[0].childNodes[0].data);
    let cantidadIgualar = e;
    console.log(e.path[2].childNodes[4].childNodes[0].defaultValue);

    console.log(e);
    
    
    let productoNuevoEnFactura = this.listaProductos.filter((x:any)=> x.id === this.idSeleccionado );
    this.vibro = "btnCarritoVibrar"
    let producto = productoNuevoEnFactura[0]
    producto.cantidad =this.onana2;
    console.log(this.listaProductosEnFactura);
    for(let prod of this.listaProductosEnFactura){

      if(producto.id == prod.id ){
       /*  prod.cantidad = producto.cantidad; */
      }
      
    }
    
  
    /*  this.btnCarrito */
  }
   
  añadirProductoFactura(producto:any){
   
    this.listaProductosEnFactura.push(producto);
    console.log(this.listaProductosEnFactura);

    localStorage.setItem("listaProductosFactura",JSON.stringify(this.listaProductosEnFactura))
    console.log(JSON.parse(localStorage.getItem("listaProductosFactura") || "[]"));
    setTimeout(() => {
      this.vibro = ""
    }, 200);
    
  }
  eliminarProductoFactura(producto:any){ // falta
    this.listaProductosEnFactura.delete(producto);
    console.log(this.listaProductosEnFactura);
  }
  constructor(private productoService:ProductoService,
              private router:Router) { }
  ngOnInit(): void {
    this.listaProductos = this.productoService.getProductos().subscribe((x:any)=>this.listaProductos = x,setTimeout(function(){
      $('#tabla').DataTable({
        responsive: true
      });
    },1000));
  }
}
