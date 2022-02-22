import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdslCustomerListComponent } from './adsl-customer-list.component';

describe('AdslCustomerListComponent', () => {
  let component: AdslCustomerListComponent;
  let fixture: ComponentFixture<AdslCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdslCustomerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdslCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
