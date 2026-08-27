import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemPedido } from '../servicios/carrito';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factura.html',
  styleUrl: './factura.css'
})
export class Factura {
  @Input() items: ItemPedido[] = [];
  @Input() cliente: any = {};
  @Input() numeroFactura: number = 0;
  @Input() fechaActual: string = '';
  @Input() total: number = 0;

  @Output() volver = new EventEmitter<void>();

  regresar() {
    this.volver.emit();
  }
}
