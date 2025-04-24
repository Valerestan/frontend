import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosComponent } from './usuarios.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PeticionService } from '../../servicios/peticion.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UsuariosComponent],
      providers: [
        PeticionService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: {
              paramMap: {
                get: () => null,
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('debe iniciar con estado "Activo"', () => {
    expect(component.estado).toBe('Activo');
  });
  it('debe tener datos como un arreglo vacío al iniciar', () => {
    expect(component.datos).toEqual([]);
  });
  it('debe asignar los valores de un usuario en verInformacion()', () => {
    const usuarioMock = {
      nombre: 'Ana',
      email: 'ana@test.com',
      estado: 'Inactivo',
    };
  });
  it('debe limpiar los campos al ejecutar Nuevo()', () => {
    component.nombre = 'Juan';
    component.email = 'juan@test.com';
    component.password = '1234';
    component.estado = 'Inactivo';
  });
});
