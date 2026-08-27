import { TestBed } from '@angular/core/testing';

import { ComidasService } from './comidas';

describe('Comidas', () => {
  let service: ComidasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComidasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
