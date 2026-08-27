import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComidasService {

  constructor(private http: HttpClient) {}

  // Consulta inicial para traer comidas al cargar la página
  obtenerTodasComidas(): Observable<any> {
    return this.http.get('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');
  }

  // Buscar comida por nombre
  obtenerPorNombre(nombre: string): Observable<any> {
    return this.http.get('https://www.themealdb.com/api/json/v1/1/search.php?s=' + nombre);
  }

  // Buscar comida por ingrediente
  obtenerPorIngrediente(ingrediente: string): Observable<any> {
    return this.http.get('https://www.themealdb.com/api/json/v1/1/filter.php?i=' + ingrediente);
  }

  generarPrecio(): number {
    return Math.floor(Math.random() * (60 - 25 + 1) + 25) * 1000;
  }
}