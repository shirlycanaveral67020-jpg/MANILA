import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Busquedacomida } from '../busquedacomida/busquedacomida';
import { ComidasService } from '../servicios/comidas';
import { Carrito } from '../servicios/carrito';

@Component({
  selector: 'app-comidas',
  standalone: true,
  imports: [CommonModule, Busquedacomida],
  providers: [ComidasService],
  templateUrl: './comidas.html',
  styleUrl: './comidas.css'
})
export class ComidasComponent implements OnInit {
  datosApi: any[] = [];
  mensaje: string = '';

  constructor(
    private comidasService: ComidasService,
    private carrito: Carrito,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarComidas();
  }

  cargarComidas() {
    this.comidasService.obtenerTodasComidas().subscribe(dato => {
      if (dato && dato.meals) {
        this.procesarResultados(dato.meals);
      }
    });
  }

  procesarResultados(lista: any) {
    
    if (!lista || !Array.isArray(lista) || lista.length === 0) {
      this.datosApi = [];
      this.cd.detectChanges();
      return;
    }

    var arregloTemporal: any[] = [];

    for (var i = 0; i < lista.length; i++) {
      var plato = lista[i];
      if (!plato.precio) {
        plato.precio = this.comidasService.generarPrecio();
      }
      plato.ingredientesTexto = this.obtenerIngredientesPlato(plato);
      if (!plato.cantidad) {
        plato.cantidad = 1;
      }
      arregloTemporal.push(plato);
    }

    this.datosApi = arregloTemporal;
    this.cd.detectChanges();
  }

  obtenerIngredientesPlato(plato: any): string {
    var lista: string[] = [];
    for (var i = 1; i <= 20; i++) {
      var ingrediente = plato['strIngredient' + i];
      if (ingrediente && ingrediente.trim() !== '') {
        lista.push(ingrediente);
      }
    }
    return lista.length > 0 ? lista.join(', ') : 'Ingredientes varios';
  }

  restarCantidad(item: any) {
    if (item.cantidad > 1) {
      item.cantidad--;
    }
  }

  sumarCantidad(item: any) {
    item.cantidad++;
  }

  agregarAlPedido(plato: any) {
    this.carrito.agregarAlCarrito({
      id: plato.idMeal,
      nombre: plato.strMeal,
      precio: plato.precio,
      cantidad: plato.cantidad,
      imagen: plato.strMealThumb
    });

    this.mensaje = `¡${plato.strMeal} agregado al pedido!`;
    this.cd.detectChanges();
  }
}