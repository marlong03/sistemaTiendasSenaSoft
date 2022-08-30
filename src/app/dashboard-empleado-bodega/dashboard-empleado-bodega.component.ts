import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { envioFormularioService } from '../servicios/envioFormulario.service';

@Component({
  selector: 'app-dashboard-empleado-bodega',
  templateUrl: './dashboard-empleado-bodega.component.html',
  styleUrls: ['./dashboard-empleado-bodega.component.css']
})
export class DashboardEmpleadoBodegaComponent implements OnInit {
  obj = "as"
  nombreBtnSeleccionado = "";
  userLocalStorage = JSON.parse(localStorage.getItem("usuarioConectado") ||  ""); 
  cambiarNombreBtnSeleccionado(n:string){
    this.nombreBtnSeleccionado = n;
  }

  existeUnUsuario(){
    let user = localStorage.getItem("usuarioConectado");
    if(user == null || user == ""){
      return false;
    } else{
      return true;
    }
  }
  enviarForm(){
    let data = {
      name: "FormSubmit",
      message: "I'm from Devro LABS"
  }
  }
  cerrarSesion(){
    localStorage.removeItem("usuarioConectado");
    this.router.navigate(['/']);
  }
  constructor(private router:Router,
              private envioFormularioService:envioFormularioService) { }

  ngOnInit(): void {
    
if(this.existeUnUsuario() == false){
  this.router.navigate(['/']);
}
if(this.existeUnUsuario() == true){
  this.router.navigate(['dashboardbodega']);
}
  }

}
/* Envio de formulario */
/* 
$.ajax({
    url: "https://formsubmit.co/ajax/your@email.com",
    method: "POST",
    data: {
        name: "FormSubmit",
        message: "I'm from Devro LABS"
    },
    dataType: "json"
});
 */
