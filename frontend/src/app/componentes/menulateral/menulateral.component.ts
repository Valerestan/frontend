import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menulateral',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menulateral.component.html',
  styleUrls: ['./menulateral.component.css']
})
export class MenulateralComponent implements OnInit {
  role: string = '';
  nombre: string = '';

  ngOnInit(): void {
    // Obtener los datos del usuario del localStorage
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.role = user?.rol || '';  // Asignamos el rol
    this.nombre = user?.nombre || '';  // Asignamos el nombre del usuario
    console.log('Rol del usuario:', this.role);  // Verificamos el rol
  }
}
