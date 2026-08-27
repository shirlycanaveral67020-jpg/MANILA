import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BebidasService } from '../servicios/bebidas';

@Component({
  selector: 'app-busquedabebida',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busquedabebida.html',
  styleUrl: './busquedabebida.css'
})
export class Busquedabebida {
  nombreBusqueda: string = '';
  ingredienteBusqueda: string = '';
  tipoSeleccionado: string = 'Todos';
  categoriaSeleccionada: string = 'Todas';

  @Output() resultados = new EventEmitter<any>();

  constructor(private bebidasService: BebidasService) {}

  buscarPorNombre() {
    if (this.nombreBusqueda.trim() !== '') {
      this.bebidasService.obtenerPorNombre(this.nombreBusqueda).subscribe(dato => {
        this.resultados.emit(dato.drinks || []);
      });
    }
  }

  buscarPorIngrediente() {
    if (this.ingredienteBusqueda.trim() !== '') {
      this.bebidasService.obtenerPorIngrediente(this.ingredienteBusqueda).subscribe(dato => {
        this.procesarListaFiltrada(dato.drinks || []);
      });
    }
  }

  filtrarPorTipo() {
    if (this.tipoSeleccionado === 'Todos') {
      this.bebidasService.obtenerTodasBebidas().subscribe(dato => {
        this.resultados.emit(dato.drinks || []);
      });
    } else {
      this.bebidasService.obtenerPorTipo(this.tipoSeleccionado).subscribe(dato => {
        this.procesarListaFiltrada(dato.drinks || []);
      });
    }
  }

  filtrarPorCategoria() {
    if (this.categoriaSeleccionada === 'Todas') {
      this.bebidasService.obtenerTodasBebidas().subscribe(dato => {
        this.resultados.emit(dato.drinks || []);
      });
    } else {
      this.bebidasService.obtenerPorCategoria(this.categoriaSeleccionada).subscribe(dato => {
        this.procesarListaFiltrada(dato.drinks || []);
      });
    }
  }

  procesarListaFiltrada(lista: any[]) {
    if (lista.length === 0) {
      this.resultados.emit([]);
      return;
    }
    const bebidasCompletas: any[] = [];
    const limite = Math.min(lista.length, 10);

    for (var i = 0; i < limite; i++) {
      this.bebidasService.obtenerPorNombre(lista[i].strDrink).subscribe(res => {
        if (res.drinks && res.drinks[0]) {
          bebidasCompletas.push(res.drinks[0]);
          this.resultados.emit([...bebidasCompletas]);
        }
      });
    }
  }
}