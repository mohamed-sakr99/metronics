import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpCustomerEditComponent } from './corp-customer-edit.component';

describe('CorpCustomerEditComponent', () => {
  let component: CorpCustomerEditComponent;
  let fixture: ComponentFixture<CorpCustomerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpCustomerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpCustomerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
