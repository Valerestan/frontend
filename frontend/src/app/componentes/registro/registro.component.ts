import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import Notiflix from 'notiflix';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  constructor(private peticion: PeticionService) {}

  nombre: string = '';
  email: string = '';
  password: string = '';

  respuestaTest: any = {};
  respuestaTestError: any = {};

  Registrar() {
    return new Promise((resolve) => {
      // Asegúrate de que siempre devuelves una promesa
      if (this.nombre === '') {
        Notiflix.Notify.failure('El campo nombre es obligatorio');
        resolve(false); // Resuelve la promesa
        return;
      }
      if (this.email === '') {
        Notiflix.Notify.failure('El campo email es obligatorio');
        resolve(false); // Resuelve la promesa
        return;
      }
      if (this.password === '') {
        Notiflix.Notify.failure('El campo password es obligatorio');
        resolve(false); // Resuelve la promesa
        return;
      }

      const post = {
        host: this.peticion.urlHost,
        path: '/usuarios/registrar',
        payload: {
          nombre: this.nombre,
          email: this.email,
          password: this.password,
        },
      };

      this.peticion
        .Post(post.host + post.path, post.payload)
        .then((res: any) => {
          this.respuestaTest = res;
          if (res.state) {
            Notiflix.Notify.success(res.mensaje);
            // Limpiar formulario
            this.nombre = '';
            this.email = '';
            this.password = '';
          } else {
            this.respuestaTestError = res;
            Notiflix.Notify.failure(res.mensaje);
          }
          resolve(undefined); // Resuelve la promesa después de manejar la respuesta
        })
        .catch((error) => {
          Notiflix.Notify.failure('Error al conectar con el servidor');
          console.error('Error:', error);
          resolve(false); // Resuelve la promesa en caso de error
        });
    });
  }
}
