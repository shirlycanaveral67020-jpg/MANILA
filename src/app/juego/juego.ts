import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Carta {
  id: number;
  tipo: 'comida' | 'bebida' | 'restaurante';
  imagen: string;
  revelada: boolean;
  encontrada: boolean;
}

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juego.html',
  styleUrl: './juego.css'
})
export class Juego implements OnInit {
  cartas: Carta[] = [];
  cartasSeleccionadas: Carta[] = [];
  mostrarModalGanador: boolean = false;



imgComida: string = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';
imgBebida: string = 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80';

imgsRestaurantes: string[] = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=400&q=80'
];
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.mostrarModalGanador = false;
    this.cartasSeleccionadas = [];
    
    let plantillaCartas: Carta[] = [];

    // Añadir pareja objetivo
    plantillaCartas.push({ id: 1, tipo: 'comida', imagen: this.imgComida, revelada: false, encontrada: false });
    plantillaCartas.push({ id: 2, tipo: 'bebida', imagen: this.imgBebida, revelada: false, encontrada: false });

    // Resto de cartas de restaurante
    for (let i = 3; i <= 16; i++) {
      const imgRestaurante = this.imgsRestaurantes[i % this.imgsRestaurantes.length];
      plantillaCartas.push({
        id: i,
        tipo: 'restaurante',
        imagen: imgRestaurante,
        revelada: false,
        encontrada: false
      });
    }

    // Mezclar casillas aleatoriamente
    this.cartas = plantillaCartas.sort(() => Math.random() - 0.5);
    this.cd.detectChanges();
  }

  seleccionarCarta(carta: Carta) {
    if (carta.revelada || carta.encontrada || this.cartasSeleccionadas.length === 2) {
      return;
    }

    carta.revelada = true;
    this.cartasSeleccionadas.push(carta);

    if (this.cartasSeleccionadas.length === 2) {
      this.verificarPareja();
    }
  }

  verificarPareja() {
    const [c1, c2] = this.cartasSeleccionadas;

    const esParejaComidaBebida = (c1.tipo === 'comida' && c2.tipo === 'bebida') || (c1.tipo === 'bebida' && c2.tipo === 'comida');

    if (esParejaComidaBebida) {
      c1.encontrada = true;
      c2.encontrada = true;
      
    
      this.mostrarModalGanador = true;
      this.cd.detectChanges();
    } else {
    
      setTimeout(() => {
        c1.revelada = false;
        c2.revelada = false;
        this.cartasSeleccionadas = [];
        this.cd.detectChanges();
      }, 800);
    }
  }

  cerrarModalYReiniciar() {
    this.mostrarModalGanador = false;
    this.iniciarJuego();
  }
}