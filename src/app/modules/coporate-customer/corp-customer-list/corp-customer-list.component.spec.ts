import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpCustomerListComponent } from './corp-customer-list.component';

describe('CorpCustomerListComponent', () => {
  let component: CorpCustomerListComponent;
  let fixture: ComponentFixture<CorpCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpCustomerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
