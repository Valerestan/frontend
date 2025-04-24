import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-colleciones',
  imports: [CurrencyPipe],
  templateUrl: './colecciones.component.html',
  styleUrl: './colecciones.component.css',
})
export class CollecionesComponent {
  constructor(private peticion: PeticionService) {}

  productos: any[] = [];

  ngOnInit(): void {
    this.ListarTodos();
  }

  ListarTodos() {
    let post = {
      host: this.peticion.urlHost,
      path: '/productos/ListarTodos',
    };

    this.peticion.Get(post.host + post.path).then((res: any) => {
      this.productos = res.filter(
        (item: any) => item.categoria === 'coleccion'
      );
      console.log(this.productos);
    });
  }
}
