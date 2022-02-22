import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCorpCustomerComponent } from './add-corp-customer.component';

describe('AddCorpCustomerComponent', () => {
  let component: AddCorpCustomerComponent;
  let fixture: ComponentFixture<AddCorpCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCorpCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCorpCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
