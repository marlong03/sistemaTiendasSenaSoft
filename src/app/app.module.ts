import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CrudComponent } from './crud/crud.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardEmpleadoSucursalComponent } from './dashboard-empleado-sucursal/dashboard-empleado-sucursal.component';
import { DashboardEmpleadoBodegaComponent } from './dashboard-empleado-bodega/dashboard-empleado-bodega.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ModalFacturaComponent } from './modal-factura/modal-factura.component';
const routes:Routes = [
  
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"dashboardbodega",
    component:DashboardEmpleadoBodegaComponent
  },
  {
    path:"dashboardsucursal",
    component:DashboardEmpleadoSucursalComponent
  }
  
]
@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    DashboardEmpleadoSucursalComponent,
    DashboardEmpleadoBodegaComponent,
    HomeComponent,
    ModalFacturaComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
