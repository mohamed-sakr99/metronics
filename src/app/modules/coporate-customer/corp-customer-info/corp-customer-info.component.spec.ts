import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpCustomerInfoComponent } from './corp-customer-info.component';

describe('CorpCustomerInfoComponent', () => {
  let component: CorpCustomerInfoComponent;
  let fixture: ComponentFixture<CorpCustomerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpCustomerInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpCustomerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
