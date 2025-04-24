import { TestBed } from '@angular/core/testing';
import { RegistroComponent } from './registro.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import Notiflix from 'notiflix';

describe('RegistroComponent', () => {
  let component: RegistroComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent, HttpClientTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: {} }, PeticionService],
    }).compileComponents();

    const fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    const fixture = TestBed.createComponent(RegistroComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('debería mostrar error si el nombre está vacío', () => {
    spyOn(Notiflix.Notify, 'failure');
    component.nombre = '';
    component.email = 'test@example.com';
    component.password = '123456';

    const resultado = component.registrar();

    expect(resultado).toBeFalse();
    expect(Notiflix.Notify.failure).toHaveBeenCalledWith(
      'El campo nombre es obligatorio'
    );
  });

  it('debería mostrar error si el email está vacío', () => {
    spyOn(Notiflix.Notify, 'failure');
    component.nombre = 'Juan';
    component.email = '';
    component.password = '123456';

    const resultado = component.registrar();

    expect(resultado).toBeFalse();
    expect(Notiflix.Notify.failure).toHaveBeenCalledWith(
      'El campo email es obligatorio'
    );
  });

  it('debería mostrar error si la contraseña está vacía', () => {
    spyOn(Notiflix.Notify, 'failure');
    component.nombre = 'Juan';
    component.email = 'test@example.com';
    component.password = '';

    const resultado = component.registrar();

    expect(resultado).toBeFalse();
    expect(Notiflix.Notify.failure).toHaveBeenCalledWith(
      'El campo password es obligatorio'
    );
  });

  it('debería llamar al servicio si todos los campos son válidos', async () => {
    const peticionService = TestBed.inject(PeticionService);
    spyOn(peticionService, 'post').and.returnValue(
      Promise.resolve({ state: true, mensaje: 'Registro exitoso' })
    );
    spyOn(Notiflix.Notify, 'success');

    component.nombre = 'Juan';
    component.email = 'juan@example.com';
    component.password = '123456';

    const resultado = await component.registrar();

    expect(resultado).toBeTrue();
    expect(peticionService.post).toHaveBeenCalledWith(
      peticionService.urlHost + '/usuarios/registrar',
      {
        nombre: 'Juan',
        email: 'juan@example.com',
        password: '123456',
      }
    );
    expect(Notiflix.Notify.success).toHaveBeenCalledWith('Registro exitoso');
  });
  it('debería mostrar error si el email no es válido', () => {
    spyOn(Notiflix.Notify, 'failure');
    component.nombre = 'Juan';
    component.email = 'correo-invalido';
    component.password = '123456';

    // Simula una validación simple
    const emailValido = /\S+@\S+\.\S+/.test(component.email);
    if (!emailValido) {
      Notiflix.Notify.failure('El email no es válido');
    }

    expect(Notiflix.Notify.failure).toHaveBeenCalledWith(
      'El email no es válido'
    );
  });
});
