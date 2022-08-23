import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  @Input() nombreBtnSeleccionado:string; 
  listaProductos:any = [];
  listaCategorias:any = [];
  listaProovedores:any = [];
  
  palabraBorrar = "Borrar";
  palabraActualizar = "Actualizar";
  palabraAgregar = "Agregar";
  palabraAccionModal:any;

/* ------------------ */
  constructor(private productoService: ProductoService ) { }
  ngOnInit(): void {
    this.listaProductos = this.productoService.getProductos().subscribe((x:any)=>this.listaProductos = x)
  }
/* ------------------ */
  abrir = false; 
  modalDisplay = 'none';
  abrirModalProducto(e:any){
    this.modalDisplay = 'block';
    console.log(e.target.defaultValue);
    this.palabraAccionModal = e.target.defaultValue;
    if(this.palabraAccionModal == this.palabraActualizar){
      this.listaProductos.filter((x:any) => {
        if(x.id == this.idSeleccionado){
          this.nombre= x.nombre;
          this.proveedor = x.idProveedor.nombre;  
          this.cantidad = x.cantidad; 
          this.precioUnd = x.precioUnidad; 
          this.categoria = x.idCategoria.categoria;  
        }
      });
    }

  }
  cerrarDisplay(){
    this.modalDisplay = 'none';
    console.log(this.listaProductos);
    if(this.palabraAccionModal == this.palabraActualizar){
      this.nombre= "";
          this.proveedor = "";  
          this.cantidad = ""; 
          this.precioUnd = ""; 
          this.categoria = "";  
    }
    
  }
/* ------------------ */
  nombre:string = ""; 
  proveedor:string = ""; 
  cantidad:string = ""; 
  precioUnd:string = ""; 
  categoria:string = ""; 

  ff(){
    localStorage.setItem("ultimoProducto",JSON.stringify(
      { 
        id: 0,
        nombre: this.nombre,
        cantidad:this.cantidad,
        idCategoria:{
          id: 1
        },
        idProveedor:{
          id: 1
        },
        precioUnidad:this.precioUnd,
        precioTotal:"",
      }
    )
    );
  }
  rellenarCamposLocalStorage(){
    let prod = JSON.parse(localStorage.getItem("ultimoProducto") || "[]");  
    console.log(prod);
    this.nombre = prod.nombre
    this.cantidad = prod.cantidad
    this.precioUnd = prod.precioUnidad
    this.categoria = prod.idCategoria
    this.proveedor = prod.idProveedor
    }
      guardarProducto(){
    let data = {
      id: 0,
      nombre: this.nombre,
      cantidad:parseInt(this.cantidad),
      idCategoria:{
        id: 1
      },
      idProveedor:{
        id: 1
      },
      precioUnidad: parseInt(this.precioUnd),
      precioTotal: (parseInt(this.precioUnd) * parseInt(this.cantidad)),
    }
    try {
      this.productoService.postProducto(data);
      console.log("data enviada");
    } catch (error) {
      console.log("no enviado");
      console.log(error);
    }
    localStorage.removeItem("ultimoProducto");
  }
/* ------------------ */
  idSeleccionado:number;
  seleccionarProductoProId(e:any){
    this.idSeleccionado = parseInt(e.path[1].childNodes[0].innerHTML);
    console.log(e.path[1].childNodes[0].innerHTML);
  }
  /* Actualizar */
  actualizarProducto(){
    let data = {
      id: 10,
      nombre: this.nombre,
      cantidad:parseInt(this.cantidad),
      idCategoria:{
        id: 1
      },
      idProveedor:{
        id: 1
      },
      precioUnidad: parseInt(this.precioUnd),
      precioTotal: (parseInt(this.precioUnd) * parseInt(this.cantidad)),
    }
    try {
      this.productoService.putProducto(this.idSeleccionado,data);
      console.log("data enviada y actualizada");
    } catch (error) {
      console.log("no enviado");
      
      console.log(error);
    }
  }
  borrarProducto(){
    try{
      this.productoService.deleteProducto(this.idSeleccionado)
      alert("Se elimino un producto exitosamente!")
    }catch(e){
      console.log("no pudimos eliminar el producto");
      console.log(e);
    }
  }
  accionarCallback(){
    if(this.palabraAccionModal == this.palabraActualizar){
      this.actualizarProducto();
    }
    else if(this.palabraAccionModal == this.palabraAgregar){
      this.guardarProducto();
    }
  }
  

}
