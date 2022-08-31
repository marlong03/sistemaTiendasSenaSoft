import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CrudProductosComponent } from './crud/crudProductos/crudProductos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardEmpleadoSucursalComponent } from './dashboard-empleado-sucursal/dashboard-empleado-sucursal.component';
import { DashboardEmpleadoBodegaComponent } from './dashboard-empleado-bodega/dashboard-empleado-bodega.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ModalFacturaComponent } from './modal-factura/modal-factura.component';
import { CrudCategoriasComponent } from './crud/crudCategorias/crudCategorias.component';
import { CrudProveedoresComponent } from './crud/crudProveedores/crudProveedores.component';
import { DataTablesModule } from 'angular-datatables';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
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
    CrudProductosComponent,
    CrudCategoriasComponent,
    CrudProveedoresComponent,


    
    DashboardEmpleadoSucursalComponent,
    DashboardEmpleadoBodegaComponent,
    HomeComponent,
    ModalFacturaComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    DataTablesModule,
    SweetAlert2Module
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule {
  
 }
