import { Component } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent {
  producto = {
    titulo: '',
    precio: null,
    imagen: '',
    material: '',
    categoria: '',
  };

  productos: any[] = [];

  onSubmit() {
    this.productos.push({ ...this.producto });
    this.producto = {
      titulo: '',
      precio: null,
      imagen: '',
      material: '',
      categoria: '',
    };
  }
}
