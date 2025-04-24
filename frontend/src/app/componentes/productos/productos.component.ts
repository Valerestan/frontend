import { Component } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import Notiflix from 'notiflix';
declare var $: any;

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [MenulateralComponent, CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  constructor(private peticion: PeticionService) {}

  nombre: string = '';
  codigo: Number = 0;
  precio: Number = 0;
  cantidad: Number = 0;
  descripcion: string = '';
  foto: string = '';
  categoria: string = '';

  data: any[] = [];

  idseleccionado: string = '';

  ngOnInit(): void {
    this.ListarTodos();
  }

  ListarTodos() {
    var post = {
      host: this.peticion.urlHost,
      path: '/productos/ListarTodos',
    };

    this.peticion.Get(post.host + post.path).then((res: any) => {
      this.data = res;
    });
  }

  SeleccionarId(id: string) {
    this.idseleccionado = id;
    const post = {
      host: this.peticion.urlHost,
      path: '/productos/listarId', // ← Corregir nombre de ruta
      payload: { id: id },
    };

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      this.nombre = res[0].nombre;
      this.codigo = res[0].codigo;
      this.precio = res[0].precio;
      this.cantidad = res[0].cantidad;
      this.descripcion = res[0].descripcion;
      this.foto = res[0].foto;
      this.categoria = res[0].categoria;

      $('#exampleModal').modal('show');
    });
  }

  Actualizar() {
    const post = {
      host: this.peticion.urlHost,
      path: '/productos/actualizar', // ← Corregir nombre de ruta
      payload: {
        id: this.idseleccionado,
        nombre: this.nombre,
        codigo: this.codigo,
        precio: this.precio,
        cantidad: this.cantidad,
        descripcion: this.descripcion,
        foto: this.foto,
        categoria: this.categoria,
      },
    };

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      if (res.state == true) {
        Notiflix.Notify.success(res.mensaje, {
          timeout: 5000,
          clickToClose: true,
        });
        this.ListarTodos();
        $('#exampleModal').modal('hide');
      } else {
        Notiflix.Notify.failure(res.mensaje);
      }
    });
  }

  Eliminar() {
    Notiflix.Confirm.show(
      'Confirmar eliminación',
      `¿Estás seguro que deseas eliminar el productos con el id ${this.idseleccionado}? Esta acción no se puede deshacer.`,
      'Sí, eliminar',
      'Cancelar',
      () => {
        const post = {
          host: this.peticion.urlHost,
          path: '/productos/borrar',
          payload: {
            id: this.idseleccionado,
          },
        };

        // Mostrar indicador de carga
        Notiflix.Loading.standard('Eliminando producto...');

        this.peticion
          .Post(post.host + post.path, post.payload)
          .then((res: any) => {
            Notiflix.Loading.remove();

            if (res.state == true) {
              Notiflix.Notify.success(res.mensaje, {
                timeout: 3000,
                clickToClose: true,
              });
              this.ListarTodos();
              $('#exampleModal').modal('hide');
            } else {
              Notiflix.Notify.failure(res.mensaje, {
                timeout: 4000,
                clickToClose: true,
              });
            }
          })
          .catch((error) => {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure('Error al intentar eliminar el producto', {
              timeout: 4000,
              clickToClose: true,
            });
            console.error('Error:', error);
          });
      },
      () => {
        // Acción al cancelar
        Notiflix.Notify.info('Eliminación cancelada', {
          timeout: 2000,
          clickToClose: true,
        });
      },
      {
        titleColor: '#d33',
        okButtonBackground: '#d33',
        borderRadius: '5px',
      }
    );
  }

  Nuevo() {
    this.nombre = '';
    this.codigo = 0;
    this.descripcion = '';
    this.precio = 0;
    this.cantidad = 0;
    this.foto = '';
    this.categoria = '';
    this.idseleccionado = '';

    $('#exampleModal').modal('show');
  }

  Guardar() {
    const post = {
      host: this.peticion.urlHost,
      path: '/productos/guardar', // ← Corregir nombre de ruta
      payload: {
        codigo: this.codigo,
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        cantidad: this.cantidad,
        foto: this.foto,
        categoria: this.categoria,
      },
    };

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      if (res.state == true) {
        Notiflix.Notify.success(res.mensaje, {
          timeout: 5000,
          clickToClose: true,
        });
        this.ListarTodos();
        $('#exampleModal').modal('hide');
      } else {
        Notiflix.Notify.failure(res.mensaje);
      }
    });
  }
}
