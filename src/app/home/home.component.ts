import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email:any;
  password:any;

  iniciarSesion(){
    console.log(this.email);
    console.log(this.password);
    /* alert("dashboard bodega")
    alert("dashboard sucursal") */
    let data = {
      correo:this.email,
      password:this.password
    }
   /*  let user = */ this.usuarioService.getUsuariosLogin(data).subscribe((x:any)=>{
      console.log(x);
      localStorage.setItem("usuarioConectado","");

      localStorage.setItem("usuarioConectado",JSON.stringify(x));
      try{

        if(x.idRol.id == 1){
          this.router.navigate(['dashboardbodega']);
        }
        else if(x.idRol.id == 2){
          this.router.navigate(['dashboardsucursal']);
        }
        }catch(err){
          alert("EL USUARIO NO EXISTE");
          
        }
        
    })
    
  }
  listaUsuarios:any;
  constructor(private usuarioService:UsuarioService,
    private router:Router) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe((x:any)=>this.listaUsuarios = x)
  }

}
