import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmpleadoBodegaComponent } from './dashboard-empleado-bodega.component';

describe('DashboardEmpleadoBodegaComponent', () => {
  let component: DashboardEmpleadoBodegaComponent;
  let fixture: ComponentFixture<DashboardEmpleadoBodegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEmpleadoBodegaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEmpleadoBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
