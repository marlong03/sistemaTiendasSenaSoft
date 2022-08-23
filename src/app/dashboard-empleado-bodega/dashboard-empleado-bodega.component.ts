import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-empleado-bodega',
  templateUrl: './dashboard-empleado-bodega.component.html',
  styleUrls: ['./dashboard-empleado-bodega.component.css']
})
export class DashboardEmpleadoBodegaComponent implements OnInit {
  obj = "as"
  nombreBtnSeleccionado = "";
  cambiarNombreBtnSeleccionado(n:string){
    this.nombreBtnSeleccionado = n;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
