import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComidasService } from '../servicios/comidas';

@Component({
  selector: 'app-busquedacomida',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ComidasService],
  templateUrl: './busquedacomida.html',
  styleUrl: './busquedacomida.css'
})
export class Busquedacomida {
  nombreBusqueda: string = '';
  ingredienteBusqueda: string = '';

  @Output() resultados = new EventEmitter<any[]>();

  constructor(private comidasService: ComidasService) {}

  buscarPorNombre() {
    if (this.nombreBusqueda.trim() === '') {
      this.comidasService.obtenerTodasComidas().subscribe(dato => {
        this.resultados.emit(dato ? dato.meals || [] : []);
      });
      return;
    }

    this.comidasService.obtenerPorNombre(this.nombreBusqueda).subscribe(dato => {
      this.resultados.emit(dato ? dato.meals || [] : []);
    });
  }

  buscarPorIngrediente() {
    if (this.ingredienteBusqueda.trim() === '') {
      this.comidasService.obtenerTodasComidas().subscribe(dato => {
        this.resultados.emit(dato ? dato.meals || [] : []);
      });
      return;
    }

    this.comidasService.obtenerPorIngrediente(this.ingredienteBusqueda).subscribe(dato => {
      const lista = dato ? dato.meals || [] : [];
      if (lista.length === 0) {
        this.resultados.emit([]);
        return;
      }

      const comidasCompletas: any[] = [];
      for (var i = 0; i < Math.min(lista.length, 10); i++) {
        this.comidasService.obtenerPorNombre(lista[i].strMeal).subscribe(res => {
          if (res && res.meals && res.meals[0]) {
            comidasCompletas.push(res.meals[0]);
            this.resultados.emit([...comidasCompletas]);
          }
        });
      }
    });
  }
}