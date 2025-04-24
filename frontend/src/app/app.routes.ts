import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/pages/home/home.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { ProductsComponent } from './componentes/pages/products/products.component';
import { CollecionesComponent } from './componentes/colecciones/colecciones.component';
import { SobrenosotrosComponent } from './componentes/sobrenosotros/sobrenosotros.component';
import { TendeciasComponent } from './componentes/tendencias/tendencias.component';
import { PagenotfoundComponent } from './componentes/pages/pagenotfound/pagenotfound.component';
import { ProductosComponent } from './componentes/productos/productos.component';

export const routes: Routes = [
  {
    path: 'inicio',
    component: HomeComponent,
    pathMatch: 'full',
    data: { title: 'Home' },
  },
  {
    path: 'registro',
    component: RegistroComponent,
    pathMatch: 'full',
    data: { title: 'registro' },
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    data: { title: 'login' },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    data: { title: 'dashboard' },
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    pathMatch: 'full',
    data: { title: 'usuario' },
  },
  {
    path: 'productos',
    component: ProductsComponent,
    pathMatch: 'full',
    data: { title: 'productos' },
  },
  {
    path: 'productoscrear',
    component: ProductosComponent,
    pathMatch: 'full',
    data: { title: 'productos' },
  },
  {
    path: 'tendecias',
    title: 'mäbello | Tendecias',
    component: TendeciasComponent,
  },
  {
    path: 'colleciones',
    title: 'mäbello| Colleciones',
    component: CollecionesComponent,
  },
  {
    path: 'sobrenosotros',
    title: 'mäbello | Sobre Nosotros',
    component: SobrenosotrosComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  {
    path: '**',
    title: 'Página No Encontrada',
    component: PagenotfoundComponent,
  },
];
