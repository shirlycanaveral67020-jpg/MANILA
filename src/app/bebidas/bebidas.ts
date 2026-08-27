import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Busquedabebida } from '../busquedabebida/busquedabebida';
import { BebidasService } from '../servicios/bebidas';
import { Carrito } from '../servicios/carrito';

@Component({
  selector: 'app-bebidas',
  standalone: true,
  imports: [CommonModule, Busquedabebida],
  providers: [BebidasService],
  templateUrl: './bebidas.html',
  styleUrl: './bebidas.css'
})
export class BebidasComponent implements OnInit {
  datosApi: any[] = [];
  mensaje: string = '';

  constructor(
    private bebidasService: BebidasService,
    private carrito: Carrito,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarBebidas();
  }

  cargarBebidas() {
    this.bebidasService.obtenerTodasBebidas().subscribe(dato => {
      if (dato && dato.drinks) {
        this.procesarResultados(dato.drinks);
      }
    });
  }

  procesarResultados(lista: any) {
    if (!lista) {
      this.datosApi = [];
      this.cd.detectChanges();
      return;
    }

    var arregloTemporal: any[] = [];

    for (var i = 0; i < lista.length; i++) {
      var bebida = lista[i];
      
      if (!bebida.precio) {
        bebida.precio = this.bebidasService.generarPrecio();
      }

      bebida.ingredientesTexto = this.obtenerIngredientesBebida(bebida);

      if (!bebida.cantidad) {
        bebida.cantidad = 1;
      }

      arregloTemporal.push(bebida);
    }

    this.datosApi = arregloTemporal;
    this.cd.detectChanges();
  }

  obtenerIngredientesBebida(bebida: any): string {
    var lista: string[] = [];
    for (var i = 1; i <= 15; i++) {
      var ingrediente = bebida['strIngredient' + i];
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

  agregarAlPedido(bebida: any) {
    this.carrito.agregarAlCarrito({
      id: bebida.idDrink,
      nombre: bebida.strDrink,
      precio: bebida.precio,
      cantidad: bebida.cantidad,
      imagen: bebida.strDrinkThumb
    });

    this.mensaje = `¡${bebida.strDrink} agregada al pedido!`;
    this.cd.detectChanges();
  }
}