import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmpleadoSucursalComponent } from './dashboard-empleado-sucursal.component';

describe('DashboardEmpleadoSucursalComponent', () => {
  let component: DashboardEmpleadoSucursalComponent;
  let fixture: ComponentFixture<DashboardEmpleadoSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEmpleadoSucursalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEmpleadoSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
