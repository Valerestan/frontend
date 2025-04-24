import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosComponent } from './productos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PeticionService } from '../../servicios/peticion.service';

describe('ProductosComponent', () => {
  let component: ProductosComponent;
  let fixture: ComponentFixture<ProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductosComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe iniciar con la categoría "productos"', () => {
    expect(component.categoria).toBe('productos');
  });

  it('debe tener datos como un arreglo vacío al iniciar', () => {
    expect(component.datos).toEqual([]);
  });

  it('debe asignar los valores de un producto en verInformacion()', () => {
    (window as any).$ = jasmine.createSpy().and.returnValue({
      modal: jasmine.createSpy('modal'),
    });

    const productoMock = {
      _id: '123',
      titulo: 'Producto prueba',
      precio: 99.99,
      material: 'Madera',
      categoria: 'hogar',
    };

    component.verInformacion(productoMock);

    expect(component._id).toBe('123');
    expect(component.titulo).toBe('Producto prueba');
    expect(component.precio).toBe(99.99);
    expect(component.material).toBe('Madera');
    expect(component.categoria).toBe('hogar');
  });
  it('debe limpiar los campos al ejecutar Nuevo()', () => {
    (window as any).$ = jasmine.createSpy().and.returnValue({
      modal: jasmine.createSpy('modal'),
    });

    component._id = 'abc';
    component.titulo = 'Producto viejo';
    component.precio = 50;
    component.material = 'Metal';
    component.categoria = 'oficina';

    component.Nuevo();

    expect(component._id).toBe('');
    expect(component.titulo).toBe('');
    expect(component.precio).toBe(0);
    expect(component.material).toBe('');
    expect(component.categoria).toBe('productos');
  });
  it('debe llamar a listarTodos al iniciar', () => {
    const spy = spyOn(component, 'listarTodos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  it('debe llenar datos al listarTodos()', async () => {
    const productosMock = [{ titulo: 'Producto 1' }, { titulo: 'Producto 2' }];

    const peticionService = TestBed.inject(PeticionService);
    spyOn(peticionService, 'Get').and.returnValue(
      Promise.resolve(productosMock)
    );

    await component.listarTodos();

    expect(component.datos.length).toBe(2);
    expect(component.datos[0].titulo).toBe('Producto 1');
  });
});
