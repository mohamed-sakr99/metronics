import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedlineCustomerListComponent } from './fixedline-customer-list.component';

describe('FixedlineCustomerListComponent', () => {
  let component: FixedlineCustomerListComponent;
  let fixture: ComponentFixture<FixedlineCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedlineCustomerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedlineCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
