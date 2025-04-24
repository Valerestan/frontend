import { Component, Host, OnInit } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { PeticionService } from '../../servicios/peticion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Notiflix from 'notiflix';
declare var $: any;

@Component({
  selector: 'app-usuarios',
  imports: [MenulateralComponent, CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
  constructor(private peticion: PeticionService) {}

  nombre: string = '';
  email: string = '';
  password: string = '';
  estado: string = 'Activo';

  respuestaTest: any = {};
  respuestaTestError: any = {};

  data: any[] = [];

  ngOnInit(): void {
    this.ListarTodos();
  }

  Nuevo() {
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.estado = 'Activo';

    $('#exampleModal').modal('show');
  }

  Guardar(mockResponse?: any) {
    return new Promise((resolve) => {
      if (!this.nombre) {
        this.respuestaTest = {
          state: false,
          mensaje: 'El nombre es requerido',
        };
        resolve(false);
        return;
      }
      if (!this.email) {
        this.respuestaTest = { state: false, mensaje: 'El email es requerido' };
        resolve(false);
        return;
      }
      if (!this.password) {
        this.respuestaTest = {
          state: false,
          mensaje: 'El password es requerido',
        };
        resolve(false);
        return;
      }

      const post = {
        host: this.peticion.urlHost,
        path: '/usuarios/registrar',
        payload: {
          email: this.email,
          nombre: this.nombre,
          password: this.password,
        },
      };

      // Aquí se utiliza la respuesta simulada si se proporciona
      const response =
        mockResponse || this.peticion.Post(post.host + post.path, post.payload);

      response
        .then((res: { state: boolean; mensaje: string }) => {
          this.respuestaTest = res;
          if (res.state === true) {
            Notiflix.Notify.success(res.mensaje);
            this.nombre = '';
            this.email = '';
            this.password = '';
            this.ListarTodos();
            $('#exampleModal').modal('hide');
          } else {
            this.respuestaTestError = res; // Asegúrate de que esto se ejecute cuando el usuario ya existe
            Notiflix.Notify.failure(res.mensaje);
          }
          resolve(undefined);
        })
        .catch((error: any) => {
          Notiflix.Notify.failure('Error al conectar con el servidor');
          console.error('Error:', error);
          resolve(false);
        });
    });
  }

  ListarTodos() {
    var post = {
      host: this.peticion.urlHost,
      path: '/usuarios/ListarTodos',
    };

    this.peticion
      .Get(this.peticion.urlHost + '/usuarios/listarTodos')
      .then((res: any) => {
        console.log('Respuesta completa:', res); // Verifica qué contiene realmente res
        this.data = res;
      })
      .catch((error) => {
        console.error('Error:', error);
        this.data = [{ state: false, mensaje: 'Error al listar usuarios' }];
      });
  }

  SeleccionarEmail(email: string) {
    if (!email) {
      this.respuestaTest = { state: false, mensaje: 'El email es requerido' };
      return; // Asegúrate de salir de la función aquí
    }
    const post = {
      host: this.peticion.urlHost,
      path: '/usuarios/listarUnico', // ← Corregir nombre de ruta
      payload: { email: email },
    };

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      this.respuestaTest = res;
      if (res.length > 0) {
        this.nombre = res[0].nombre;
        this.email = res[0].email;
        this.estado = res[0].estado;

        $('#exampleModal').modal('show');
      }
    });
  }

  Actualizar() {
    if (!this.email) {
      this.respuestaTest = { state: false, mensaje: 'El email es requerido' };
      return; // Asegúrate de salir de la función aquí
    }
    if (!this.nombre) {
      this.respuestaTest = { state: false, mensaje: 'El nombre es requerido' };
      return; // Asegúrate de salir de la función aquí
    }
    if (!this.estado) {
      this.respuestaTest = { state: false, mensaje: 'El estado es requerido' };
      return; // Asegúrate de salir de la función aquí
    }

    const post = {
      host: this.peticion.urlHost,
      path: '/usuarios/actualizar', // ← Corregir nombre de ruta
      payload: {
        email: this.email,
        nombre: this.nombre,
        estado: this.estado,
      },
    };

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      this.respuestaTest = res;
      if (res.state == true) {
        Notiflix.Notify.success(res.mensaje, {});
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
      `¿Estás seguro que deseas eliminar el usuario con email ${this.email}? Esta acción no se puede deshacer.`,
      'Sí, eliminar',
      'Cancelar',
      () => {
        const post = {
          host: this.peticion.urlHost,
          path: '/usuarios/borrar',
          payload: {
            email: this.email,
          },
        };

        // Mostrar indicador de carga
        Notiflix.Loading.standard('Eliminando usuario...');

        this.peticion
          .Post(post.host + post.path, post.payload)
          .then((res: any) => {
            this.respuestaTest = res;
            Notiflix.Loading.remove();

            if (res.state == true) {
              Notiflix.Notify.success(res.mensaje, {});
              this.ListarTodos();
              $('#exampleModal').modal('hide');
            } else {
              Notiflix.Notify.failure(res.mensaje, {});
            }
          })
          .catch((error) => {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure('Error al intentar eliminar el usuario', {
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
}
