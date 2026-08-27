import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Busquedacomida } from './busquedacomida';

describe('Busquedacomida', () => {
  let component: Busquedacomida;
  let fixture: ComponentFixture<Busquedacomida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Busquedacomida],
    }).compileComponents();

    fixture = TestBed.createComponent(Busquedacomida);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
