import { TestBed } from '@angular/core/testing';

import { CoporateApiService } from './coporate-api.service';

describe('CoporateApiService', () => {
  let service: CoporateApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoporateApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
