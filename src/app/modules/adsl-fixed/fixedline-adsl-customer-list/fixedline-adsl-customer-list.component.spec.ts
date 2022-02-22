import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedlineAdslCustomerListComponent } from './fixedline-adsl-customer-list.component';

describe('FixedlineAdslCustomerListComponent', () => {
  let component: FixedlineAdslCustomerListComponent;
  let fixture: ComponentFixture<FixedlineAdslCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedlineAdslCustomerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedlineAdslCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
