import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-platosestrellas',
  standalone: true,
  imports: [],
  templateUrl: './platosestrellas.html',
  styleUrl: './platosestrellas.css'
})
export class Platosestrellas implements OnInit {

  platoEstrella: any = { nombre: '', imagen: '', ingredientes: '', precio: 0 };
  bebidaEstrella: any = { nombre: '', imagen: '', ingredientes: '', precio: 0 };

  // Listas de precios
  private preciosComida: number[] = [22000, 25000, 28000, 32000, 35000];
  private preciosBebida: number[] = [12000, 15000, 18000, 20000, 24000];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarPlatoEstrella();
    this.cargarBebidaEstrella();
  }

  private obtenerPrecioRandom(lista: number[]): number {
    return lista[Math.floor(Math.random() * lista.length)];
  }

  cargarPlatoEstrella(): void {
    this.http.get('https://www.themealdb.com/api/json/v1/1/random.php')
      .subscribe((res: any) => {
        if (res?.meals?.length > 0) {
          const comida = res.meals[0];
          this.platoEstrella = {
            nombre: comida.strMeal,
            imagen: comida.strMealThumb,
            ingredientes: `${comida.strIngredient1}, ${comida.strIngredient2}, ${comida.strIngredient3}, ${comida.strIngredient4}`,
            precio: this.obtenerPrecioRandom(this.preciosComida)
          };
          this.cdr.detectChanges();
        }
      });
  }

  cargarBebidaEstrella(): void {
    this.http.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .subscribe((res: any) => {
        if (res?.drinks?.length > 0) {
          const bebida = res.drinks[0];
          this.bebidaEstrella = {
            nombre: bebida.strDrink,
            imagen: bebida.strDrinkThumb,
            ingredientes: `${bebida.strIngredient1}, ${bebida.strIngredient2}, ${bebida.strIngredient3}`,
            precio: this.obtenerPrecioRandom(this.preciosBebida)
          };
          this.cdr.detectChanges();
        }
      });
  }
}