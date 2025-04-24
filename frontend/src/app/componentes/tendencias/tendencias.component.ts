import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [FormsModule, CurrencyPipe, CommonModule],

  templateUrl: './tendencias.component.html',
  styleUrl: './tendencias.component.css',
})
export class TendeciasComponent implements OnInit {
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
        (item: any) => item.categoria === 'tendencias'
      );
      console.log(this.productos);
    });
  }
}
