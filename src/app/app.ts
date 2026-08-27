import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Navegacion } from "./navegacion/navegacion";
import { Platosestrellas } from "./platosestrellas/platosestrellas";
import { Footer } from "./footer/footer";
import { filter } from 'rxjs/operators';




@Component({
  selector: 'app-root',

  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, Inicio, Navegacion, Platosestrellas, Footer]
  
})
export class App {
  protected readonly title = signal('webproject');

  private router = inject(Router);
  esRutaInicio = true;
  
  constructor() {
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.esRutaInicio = event.urlAfterRedirects === '/' ;
      });
  }
}


