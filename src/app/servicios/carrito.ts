import { Injectable } from '@angular/core';

export interface ItemPedido {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class Carrito {
  private listaItems: ItemPedido[] = [];

  constructor() {}


  agregarAlCarrito(item: ItemPedido) {
    // Si ya existe en el carrito, sumamos la cantidad
    const existente = this.listaItems.find(p => p.id === item.id);
    if (existente) {
      existente.cantidad += item.cantidad;
    } else {
      this.listaItems.push({ ...item });
    }
  }

 
  obtenerItems(): ItemPedido[] {
    return this.listaItems;
  }


  eliminarItem(id: string) {
    this.listaItems = this.listaItems.filter(item => item.id !== id);
  }

  
  actualizarCantidad(id: string, cantidad: number) {
    const item = this.listaItems.find(p => p.id === id);
    if (item) {
      item.cantidad = cantidad;
      if (item.cantidad <= 0) {
        this.eliminarItem(id);
      }
    }
  }


  calcularTotal(): number {
    return this.listaItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }


  limpiarCarrito() {
    this.listaItems = [];
  }
}