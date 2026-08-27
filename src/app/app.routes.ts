    import { Routes } from '@angular/router';
    import {ComidasComponent } from './comidas/comidas';
    import { BebidasComponent } from './bebidas/bebidas';
    import { Pedido } from './pedidos/pedidos';
    import { Juego } from './juego/juego';

    export const routes: Routes = [
        { path: 'pedidos', component:   Pedido },
        {path: 'juego', component:  Juego},
        {path: 'bebidas', component: BebidasComponent},
        { path: 'comidas', component: ComidasComponent },
        {path: '**', redirectTo :''}
    ];
