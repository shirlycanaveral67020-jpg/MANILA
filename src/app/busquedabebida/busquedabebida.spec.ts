import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Busquedabebida } from './busquedabebida';

describe('Busquedabebida', () => {
  let component: Busquedabebida;
  let fixture: ComponentFixture<Busquedabebida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Busquedabebida],
    }).compileComponents();

    fixture = TestBed.createComponent(Busquedabebida);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
