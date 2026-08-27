import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Carrito, ItemPedido } from '../servicios/carrito';
import { Factura } from '../factura/factura';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule, Factura],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedido implements OnInit {
  items: ItemPedido[] = [];
  modoFactura: boolean = false;
  fechaActual: string = '';
  numeroFactura: number = 101;

  // Variables para el control del Modal
  mostrarModal: boolean = false;
  mensajeModal: string = '';

  cliente = {
    nombre: '',
    telefono: '',
    direccion: '',
    metodoPago: 'Efectivo',
    observaciones: ''
  };

  constructor(private carritoService: Carrito) {}

  ngOnInit(): void {
    this.cargarPedido();
    this.fechaActual = new Date().toLocaleDateString('es-CO');
    this.numeroFactura = Math.floor(Math.random() * 899 + 100);
  }

  cargarPedido() {
    this.items = this.carritoService.obtenerItems();
  }

  obtenerTotal(): number {
    return this.carritoService.calcularTotal();
  }

  sumarCantidad(item: ItemPedido) {
    this.carritoService.actualizarCantidad(item.id, item.cantidad + 1);
    this.cargarPedido();
  }

  restarCantidad(item: ItemPedido) {
    this.carritoService.actualizarCantidad(item.id, item.cantidad - 1);
    this.cargarPedido();
  }

  eliminarProducto(id: string) {
    this.carritoService.eliminarItem(id);
    this.cargarPedido();
  }

  // Métodos para el Modal
  abrirModal(mensaje: string) {
    this.mensajeModal = mensaje;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  generarFactura() {
    if (this.items.length === 0) {
      this.abrirModal('Tu pedido está vacío. Agrega productos antes de continuar.');
      return;
    }

    if (!this.cliente.nombre || !this.cliente.telefono || !this.cliente.direccion) {
      this.abrirModal('Por favor completa todos los campos obligatorios: Nombre, Teléfono y Dirección.');
      return;
    }

    this.modoFactura = true;
    setTimeout(() => {
      window.print();
    }, 300);
  }

  volverAlPedido() {
    this.modoFactura = false;
  }
}