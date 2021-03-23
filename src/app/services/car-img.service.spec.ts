import { TestBed } from '@angular/core/testing';

import { CarImgService } from './car-img.service';

describe('CarImgService', () => {
  let service: CarImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
