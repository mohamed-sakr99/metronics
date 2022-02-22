import { TestBed } from '@angular/core/testing';

import { DropDownMenusService } from './drop-down-menus.service';

describe('DropDownMenusService', () => {
  let service: DropDownMenusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropDownMenusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
