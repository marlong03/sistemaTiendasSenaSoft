import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { CategoriaService } from '../../servicios/categoria.service';
@Component({
  selector: 'app-crud-categorias',
  templateUrl: './crudCategorias.component.html',
  styleUrls: ['./crudCategorias.component.css']
})
export class CrudCategoriasComponent implements OnInit {
  @Input() nombreBtnSeleccionado:string; 
  listaCategorias:any = [];
  listaProovedores:any = [];
  
  palabraBorrar = "Borrar";
  palabraActualizar = "Actualizar";
  palabraAgregar = "Agregar";
  palabraAccionModal:any;

/* ------------------ */
  constructor(private Categoriaservice: CategoriaService ) { }
  ngOnInit(): void {
    this.listaCategorias = this.Categoriaservice.getCategorias().subscribe((x:any)=>this.listaCategorias = x,
    setTimeout(function(){
      $('#tabla').DataTable({
        responsive: true
      });
    },1000));
  }
/* ------------------ */
  abrir = false; 
  modalDisplay = 'none';
  abrirModalCategorias(e:any){
    this.modalDisplay = 'block';
    console.log(e.target.defaultValue);
    this.palabraAccionModal = e.target.defaultValue;
    if(this.palabraAccionModal == this.palabraActualizar){
      this.listaCategorias.filter((x:any) => {
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
    console.log(this.listaCategorias);
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
    localStorage.setItem("ultimoCategorias",JSON.stringify(
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
    let prod = JSON.parse(localStorage.getItem("ultimoCategorias") || "[]");  
    console.log(prod);
    this.nombre = prod.nombre
 
    }
      guardarCategorias(){
    let data = {
      id: 0,
      categoria: this.nombre
       
    }
    try {
      this.Categoriaservice.postCategoria(data);
      console.log("data enviada");
    } catch (error) {
      console.log("no enviado");
      console.log(error);
    }
    localStorage.removeItem("ultimoCategorias");
  }
/* ------------------ */
  idSeleccionado:number;
  seleccionarCategoriaProId(e:any){
    this.idSeleccionado = parseInt(e.path[1].childNodes[0].innerHTML);
    console.log(e.path[1].childNodes[0].innerHTML);
  }
  /* Actualizar */
  actualizarCategorias(){
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
      this.Categoriaservice.putCategoria(this.idSeleccionado,data);
      console.log("data enviada y actualizada");
    } catch (error) {
      console.log("no enviado");
      
      console.log(error);
    }
  }
  borrarCategorias(){
    try{
      this.Categoriaservice.deleteCategoria(this.idSeleccionado)
      alert("Se elimino un Categorias exitosamente!")
    }catch(e){
      console.log("no pudimos eliminar el Categorias");
      console.log(e);
    }
  }
  accionarCallback(){
    if(this.palabraAccionModal == this.palabraActualizar){
      this.actualizarCategorias();
    }
    else if(this.palabraAccionModal == this.palabraAgregar){
      this.guardarCategorias();
    }
  }
  

}
