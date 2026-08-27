import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Platosestrellas } from './platosestrellas';

describe('Platosestrellas', () => {
  let component: Platosestrellas;
  let fixture: ComponentFixture<Platosestrellas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Platosestrellas],
    }).compileComponents();

    fixture = TestBed.createComponent(Platosestrellas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
