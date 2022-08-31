import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClienteService } from '../servicios/cliente.service';
import { DetalleFacturaService } from '../servicios/detalleFactura.service';
import { FacturaService } from '../servicios/factura.service';
import { Sucursaleservice } from '../servicios/sucursal.service';

@Component({
  selector: 'app-modal-factura',
  templateUrl: './modal-factura.component.html',
  styleUrls: ['./modal-factura.component.css']
})
export class ModalFacturaComponent implements OnInit {
  abrir = false; 
  @Input() modalDisplay:string;
  @Output() modalDisplayDashboard = new EventEmitter<string>();
  modificarmodalDisplayDashboard(s:string){
    this.modalDisplayDashboard.emit(s);
  }
  @Input() listaProductosFactura:any;
  HabilitarBtnEnviarFactura = false;
  listaProductosFacturaLocalStorageExiste = JSON.parse(localStorage.getItem("listaProductosFactura") || "[]")
  cantidadEnFactura:number = 1;
  validacionCamposEnviarFactura(){
    if(this.numeroIdentificacion != "" &&
    this.listaProductosFactura.length != 0 &&
    this.sucursal != "" && this.sucursal != "Sucursal" ){
      this.HabilitarBtnEnviarFactura = true;
    }else{
      this.HabilitarBtnEnviarFactura = false;
      
    }
  }
  precioTotal:number = 0;
  precioTotalAntes:number = 0;
  listaValoresTotales:any = []; 
 /*  valorTotal:number; */
 /*  listaValoresTotales:any = []; */
 sacarTotal(){
  let precio:number = 0;
    precio = this.listaProductosFactura.map((x:any)=>{
     /*  console.log(x.precioUnidad); */
      
     return x.precioUnidad * x.cantidad
    }).reduce((count:number,x:any)=> count + x,0)
   /*  console.log("qqqqqqqqqqq"); */
    
   /*  console.log(precio); */
    this.precioTotal = precio;
    /* return precio  */
 }
  multiplicarPrecioUndPorCantidad(preciound:any,cantidad:any ){
    this.sacarTotal()
    /* console.log(preciound+"* " + cantidad + "="+parseInt(preciound) * parseInt(cantidad)); */
  /* let valorTotal = 0;  */   
  let valorTotal:any =  parseInt(preciound) * parseInt(cantidad);
  /* console.log("resultado = "+ valorTotal);
  console.log("precioTotal antes" + this.precioTotal); */
 /*  this.precioTotalAntes = this.precioTotal
  this.precioTotal+=valorTotal;    */
   /*  console.log("precioTotal despues" + this.precioTotal);
    console.log("precioTotalAntes despues" + this.precioTotalAntes); */
   /*  this.listaValoresTotales.push(valorTotal); */
  /*  if(this.listaValoresTotales.length <= this.listaProductosFactura.length){
      this.listaValoresTotales.push(valorTotal)
    }
    console.log(this.listaValoresTotales); */
 /*    preciound = 0;
    cantidad = 0; */
    /* this.valorTotal = valorTotal;
    this.valorTotal += valorTotal */
    return valorTotal;
  }
  getIna(ina:any){
/*     this.listaValoresTotales.reduce(
      (previousValue:any, currentValue:any) => previousValue + currentValue,
      this.precioTotal
      );
      console.log(this.listaValoresTotales); */
      return ina.value;
  }
  getPrecioTotal(){
    return this.precioTotal;
  }
  abrirModal(e:any){
    this.modalDisplay = 'block';
    /* console.log( this.modalDisplay);
    console.log(this.listaProductosFactura); */
    
    }
    getInputValue(a:any){
      /* console.log(a.value); */
      return a.value;   
     }
  cerrarDisplay(){
    this.modalDisplay = 'none';
    this.modificarmodalDisplayDashboard("none");
   console.log( this.modalDisplay);
   console.log(this.sucursal);
   
  }
  /* 1.Enviar Factura */
    /* 1.1 Obtener datos cliente */
    idCliente:number = 0;
    nombre:string;
    correo:string;
    direccion:string;
    numeroIdentificacion:string;
    telefono:string;
    sucursal:string = "";
    tipoClienteString = "existente";
    tipoCliente(c:string){
      this.tipoClienteString = c;
    }
  encontrarClientePorNumeroIdentificacion(numeroId:string){
    
    /* *************************************************************************** */
   /*  cliente = cliente[0]  */
    return this.clienteService.getClientes().subscribe((x : any)=>{
    let array =  x.filter((x:any)=> x.numeroIdentificacion == numeroId)
    array = array[0]
    console.log(array);
      if(array != undefined){
        console.log("EL ID DEL CLIENTE" + array.id);
        this.idCliente = array.id
        this.clienteCreado = true;
        return array.id
      }else{
        this.clienteCreado = false      
        return 0;
      }
    })
  }
    /* 1.2 Crear Cliente */
    clienteCreado:boolean = false;
    crearCliente(){
      if(this.tipoClienteString == "nuevo"){
        let data = {
          id:0,
          nombre:this.nombre,
          direccion:this.direccion,
          correo:this.correo,
          telefono:this.telefono,
          numeroIdentificacion:this.numeroIdentificacion,
          password:"password",
          idTipo:{
            id:1 // esto depornto no se envie asi
          }
        }
        console.log(data);
        
        try{
          this.clienteService.postCliente(data);
          console.log("Se creo un cliente nuevo");
          this.clienteCreado = true;
          alert("Se a creado Un cliente")
          this.tipoClienteString = "existente"
          console.log("numero id actual " + this.numeroIdentificacion);
        }catch(error){
          alert("No se logro crear el cliente. Intenta nuevamente")
          console.log("ERROR AQUI");
          console.error(error);
          this.clienteCreado = false
        }
      }
    }
    /* 1.3 Enviar Factura */
     crearFactura(){
      console.log(this.tipoClienteString);
      if(this.tipoClienteString == "nuevo"){
        this.crearCliente()
        this.EnviarFactura()
        this.enviarDetallesFactura()
      }else{
        this.EnviarFactura()
        this.enviarDetallesFactura()

      }
    }
     EnviarFactura(){
      console.log( this.numeroIdentificacion);
      
        this.clienteService.getClientes().subscribe((x : any)=>{
          let array =  x.filter((x:any)=> x.numeroIdentificacion == this.numeroIdentificacion)
          array = array[0]
          console.log(array);
            if(array != undefined){
              console.log("EL ID DEL CLIENTE" + array.id);
              this.idCliente = array.id
              this.clienteCreado = true;
              let data = {
                id:0,
                total:this.precioTotal,
                idCliente:{
                  id:array.id
                },
                sucursales:{
                  id:parseInt(this.sucursal)
                }
              }
              console.log(data);
              try {
                this.facturaService.postFactura(data);
                console.log("FACTURA ENVIADA");
                
              } catch (error) {
                console.log("ERROR AQUIII");
                console.log(error);
              }
              return array.id
            }else{
              this.clienteCreado = false      
              return 0;
            }
          })
    }
    obtenerUltimoIdFactura(){
      this.facturaService.getFacturas().subscribe((x : any)=>
      this.listaFacturas = x)
    }
    enviarDetallesFactura(){

      /*  */
      this.facturaService.getFacturas().subscribe((x : any)=>{
        let ultimoIdFacturas = x[x.length -1].id 
      console.log(ultimoIdFacturas);
        
      let ArrData = []
      for(let i of this.listaProductosFactura){
        let data = {
          "id":0,
          "cantidad":parseInt(i.cantidad),
          "precio":parseInt(i.precio),
          "idFactura":{
              "id":ultimoIdFacturas
          },
          "idProducto":{
              "id":i.id
          }
        }
        ArrData.push(data)
      }
      try{
        this.detalleFacturaService.postDetalleFactura(ArrData)
        console.log("DATOS ENVIADOS ARRDATA");
        
      }catch(err){
        console.log("NO SE PUDO ENVIAR CON ARRDATA");
        console.log(err);
        
      }
        })
      
      /*  */
     
      
      
      /* let data = this.listaDetalleFactura; */
      /* this.detalleFacturaService.postDetalleFactura(data); */
    }

    mostrarProductosBorrador(){
      let  lista = localStorage.getItem("listaProductosFactura") || "[]"
      console.log(JSON.parse(lista));
      this.listaProductosFactura = JSON.parse(lista);
      console.log(this.listaProductosFacturaLocalStorageExiste.length);
    }

    verificarCreacionCliente(idClienteFactura:any){
      if(idClienteFactura != null){
        let data = {
          id:0,
          total:this.precioTotal,
          idCliente:{
            id:parseInt(idClienteFactura) 
          },
          sucursales:{
            id:parseInt(this.sucursal)
          }
        }
        console.log(data);
        try {
          this.facturaService.postFactura(data);
          console.log("FACTURA ENVIADA");
          
        } catch (error) {
          console.log("ERROR AQUIII");
          console.log(error);
        }
      }
      
    }
  /* 2.Enviar Detalle Factura */
  /* 3.descontar productos enviados a factura del inventario */
  listaClientes:any; 
  listaSucursales:any;
  listaDetalleFactura:any;
  listaFacturas:any;
  constructor(private clienteService:ClienteService,
              private sucursalService:Sucursaleservice,
              private facturaService:FacturaService,
              private detalleFacturaService:DetalleFacturaService) { }

  ngOnInit(): void {
    /* this.listaClientes = */

      this.clienteService.getClientes().subscribe((x : any)=>
    this.listaClientes = x)
    this.facturaService.getFacturas().subscribe((x : any)=>
    this.listaFacturas = x)
    this.sucursalService.getSucursales().subscribe((x : any)=>
    this.listaSucursales = x)
    this.detalleFacturaService.getDetalleFacturas().subscribe((x : any)=>
    this.listaDetalleFactura = x)
  }
}
