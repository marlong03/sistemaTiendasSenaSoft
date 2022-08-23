import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-factura',
  templateUrl: './modal-factura.component.html',
  styleUrls: ['./modal-factura.component.css']
})
export class ModalFacturaComponent implements OnInit {
  abrir = false; 
  @Input() modalDisplay:string;
  abrirModal(e:any){
    this.modalDisplay = 'block';
   console.log( this.modalDisplay);
   
    }

  cerrarDisplay(){
    this.modalDisplay = 'none';
   console.log( this.modalDisplay);
    
    
  }
  constructor() { }

  ngOnInit(): void {
  }

}
