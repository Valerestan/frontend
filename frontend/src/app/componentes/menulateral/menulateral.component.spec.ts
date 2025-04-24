import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenulateralComponent } from './menulateral.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MenulateralComponent', () => {
  let component: MenulateralComponent;
  let fixture: ComponentFixture<MenulateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenulateralComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: {},
            queryParams: of({}),
            fragment: of('')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenulateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

