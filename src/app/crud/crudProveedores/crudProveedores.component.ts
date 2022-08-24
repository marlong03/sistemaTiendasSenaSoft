import { Component, Input, OnInit } from '@angular/core';
import { ProveedorService } from '../../servicios/proveedor.service';
@Component({
  selector: 'app-crud-proveedores',
  templateUrl: './crudProveedores.component.html',
  styleUrls: ['./crudProveedores.component.css']
})
export class CrudProveedoresComponent implements OnInit {
  @Input() nombreBtnSeleccionado:string; 
  listaProveedors:any = [];
  
  palabraBorrar = "Borrar";
  palabraActualizar = "Actualizar";
  palabraAgregar = "Agregar";
  palabraAccionModal:any;

/* ------------------ */
  constructor(private Proveedorservice: ProveedorService ) { }
  ngOnInit(): void {
    this.listaProveedors = this.Proveedorservice.getProveedors().subscribe((x:any)=>this.listaProveedors = x)
  }
/* ------------------ */
  abrir = false; 
  modalDisplay = 'none';
  abrirModalProveedors(e:any){
    this.modalDisplay = 'block';
    console.log(e.target.defaultValue);
    this.palabraAccionModal = e.target.defaultValue;
    if(this.palabraAccionModal == this.palabraActualizar){
      this.listaProveedors.filter((x:any) => {
        if(x.id == this.idSeleccionado){
         /*  this.nombre= x.nombre;
          this.proveedor = x.idProveedor.nombre;  
          this.cantidad = x.cantidad; 
          this.precioUnd = x.precioUnidad; 
          this.Proveedor = x.idProveedor.Proveedor;  */ 
        }
      });
    }
  }
  cerrarDisplay(){
    this.modalDisplay = 'none';
    console.log(this.listaProveedors);
    if(this.palabraAccionModal == this.palabraActualizar){
     /*  this.nombre= "";
          this.proveedor = "";  
          this.cantidad = ""; 
          this.precioUnd = ""; 
          this.Proveedor = "";   */
    }
  }
/* ------------------ */
  nombre:string = ""; 
  numeroIdentificacion:string="";
  telefono:string="";
  correo:string="";
  direccion:string="";
  tipoIdentificacion:number=0;

  ff(){
    localStorage.setItem("ultimoProveedors",JSON.stringify(
      { 
        id: 0,
        nombre: this.nombre,
        numeroIdentificacion:this.numeroIdentificacion,
        telefono:this.telefono,
        correo:this.correo,
        direccion:this.direccion,
        idTipo:{
          id:this.tipoIdentificacion,
        },
      }
    )
    );
  }
  rellenarCamposLocalStorage(){
    let prod = JSON.parse(localStorage.getItem("ultimoProveedors") || "[]");  
    console.log(prod);
    this.nombre = prod.nombre
 
    }
      guardarProveedors(){
    let data = {
      id: 0,
      nombre: this.nombre,
      numeroIdentificacion:this.numeroIdentificacion,
      telefono:this.telefono,
      correo:this.correo,
      direccion:this.direccion,
      idTipo:{
        id:this.tipoIdentificacion,
        
      },
    }
    try {
      this.Proveedorservice.postProveedor(data);
      console.log("data enviada");
    } catch (error) {
      console.log("no enviado");
      console.log(error);
    }
    localStorage.removeItem("ultimoProveedors");
  }
/* ------------------ */
borrar ="";
  idSeleccionado:number;
  seleccionarProveedorProId(e:any){
    this.idSeleccionado = parseInt(e.path[1].childNodes[0].innerHTML);
    console.log(e.path[1].childNodes[0].innerHTML);
  }
  /* Actualizar */
  actualizarProveedors(){
    let data = {
      id: 0,
        nombre: this.nombre,
        numeroIdentificacion:this.numeroIdentificacion,
        telefono:this.telefono,
        correo:this.correo,
        direccion:this.direccion,
        tipoIdentificacion:this.tipoIdentificacion
    }
    try {
      this.Proveedorservice.putProveedor(this.idSeleccionado,data);
      console.log("data enviada y actualizada");
    } catch (error) {
      console.log("no enviado");
      
      console.log(error);
    }
  }
  borrarProveedors(){
    try{
      this.Proveedorservice.deleteProveedor(this.idSeleccionado)
      alert("Se elimino un Proveedors exitosamente!")
    }catch(e){
      console.log("no pudimos eliminar el Proveedors");
      console.log(e);
    }
  }
  accionarCallback(){
    if(this.palabraAccionModal == this.palabraActualizar){
      this.actualizarProveedors();
    }
    else if(this.palabraAccionModal == this.palabraAgregar){
      this.guardarProveedors();
    }
  }
  

}
