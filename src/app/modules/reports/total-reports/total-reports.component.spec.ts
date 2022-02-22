import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReportsComponent } from './total-reports.component';

describe('TotalReportsComponent', () => {
  let component: TotalReportsComponent;
  let fixture: ComponentFixture<TotalReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
