import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import Notiflix from 'notiflix';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private peticion: PeticionService, private router: Router) {}

  email: string = '';
  password: string = '';

  Login() {
    if (this.email == '') {
      Notiflix.Notify.failure('El campo email es obligatorio');
      return false;
    }
    if (this.password == '') {
      Notiflix.Notify.failure('El campo password es obligatorio');
      return false;
    }

    const post = {
      host: this.peticion.urlHost,
      path: '/usuarios/login',
      payload: {
        email: this.email,
        password: this.password,
      },
    };

    this.peticion
      .Post(post.host + post.path, post.payload)
      .then((res: any) => {
        if (res.state) {
          Notiflix.Notify.success(res.mensaje, {
            timeout: 5000,
            clickToClose: true,
          });
          this.email = '';
          this.password = '';

          this.router.navigate(['dashboard']);
        } else {
          Notiflix.Notify.failure(res.mensaje);
        }
      })
      .catch((error) => {
        Notiflix.Notify.failure('Error al conectar con el servidor');
        console.error('Error:', error);
      });


    return true;
  }
}
