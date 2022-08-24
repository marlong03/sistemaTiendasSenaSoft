import { Component, Input, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { ProductoService } from '../../servicios/producto.service';
@Component({
  selector: 'app-crud-productos',
  templateUrl: './crudProductos.component.html',
  styleUrls: ['./crudProductos.component.css']
})
export class CrudProductosComponent implements OnInit {
  @Input() nombreBtnSeleccionado:string; 
  listaProductos:any = [];
  listaCategorias:any = [];
  listaProveedores:any = [];
  
  palabraBorrar = "Borrar";
  palabraActualizar = "Actualizar";
  palabraAgregar = "Agregar";
  palabraAccionModal:any;

/* ------------------ */
  constructor(private productoService: ProductoService ,
              private categoriaService:CategoriaService,
              private proveedorService:ProveedorService) { }
  ngOnInit(): void {
    this.listaProductos = this.productoService.getProductos().subscribe((x:any)=>this.listaProductos = x)
    this.listaCategorias = this.categoriaService.getCategorias().subscribe((x:any)=>this.listaCategorias = x)
    this.listaProveedores = this.proveedorService.getProveedors().subscribe((x:any)=>this.listaProveedores = x)
  }
/* ------------------ */
  abrir = false; 
  modalDisplay = 'none';
  abrirModalProducto(e:any){
    console.log(this.listaCategorias);
    
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
  categoria:string = "Seleccione Categoria"; 
  idCategoriaEnv:any;
  idProveedorEnv:any;
 obtenerIdCategoriaPorNombre(){
    this.idCategoriaEnv = this.listaCategorias.filter((x:any) =>{
      if(this.categoria == x.categoria){
        console.log(x.id);
        return x
      }else{
        console.log("no se encontro ese id ");
      }
    })
  }
  obtenerIdProveedorPorNombre(){
    this.idProveedorEnv = this.listaProveedores.filter((x:any) =>{
      if(this.nombre == x.nombre){
        console.log(x.id);
        return x
      }else{
        console.log("no se encontro ese id ");
      }
    })
  }
  
  ff(){
  
    localStorage.setItem("ultimoProducto",JSON.stringify(
      { 
        id: 0,
        nombre: this.nombre,
        cantidad:this.cantidad,
        idCategoria:{
          id: this.idCategoriaEnv[0].id
        },
        idProveedor:{
          id: this.idProveedorEnv[0].id
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
        this.obtenerIdCategoriaPorNombre()

    let data = {
      id: 0,
      nombre: this.nombre,
      cantidad:parseInt(this.cantidad),
      idCategoria:{
        id: this.idCategoriaEnv[0].id
      },
      idProveedor:{
        id: this.idProveedorEnv[0].id
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
    this.obtenerIdCategoriaPorNombre()
    let data = {
      id: 10,
      nombre: this.nombre,
      cantidad:parseInt(this.cantidad),
      idCategoria:{
        id: this.idCategoriaEnv
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
