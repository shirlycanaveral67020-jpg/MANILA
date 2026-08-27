import { TestBed } from '@angular/core/testing';
import { BebidasService } from '../servicios/bebidas'; // Se importa el servicio, no la entidad

describe('BebidasService', () => {
  let service: BebidasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BebidasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
