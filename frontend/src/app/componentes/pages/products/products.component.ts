import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../../servicios/peticion.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
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
      this.productos = res.filter((item: any) => item.categoria === 'products');
      console.log(this.productos);
    });
  }
}
