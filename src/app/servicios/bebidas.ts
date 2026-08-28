import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BebidasService {

  constructor(private http: HttpClient) {}

  obtenerTodasBebidas(): Observable<any> {
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=m');
  }

  obtenerPorNombre(nombre: string): Observable<any> {
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + nombre);
  }

  obtenerPorIngrediente(ingrediente: string): Observable<any> {
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingrediente);
  }

 
  obtenerPorTipo(tipo: string): Observable<any> {
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=' + tipo);
  }


  obtenerPorCategoria(categoria: string): Observable<any> {
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + categoria);
  }

  generarPrecio(): number {
    return Math.floor(Math.random() * (40 - 15 + 1) + 15) * 1000;
  }
}