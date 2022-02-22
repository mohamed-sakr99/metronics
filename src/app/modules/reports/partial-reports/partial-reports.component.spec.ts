import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialReportsComponent } from './partial-reports.component';

describe('PartialReportsComponent', () => {
  let component: PartialReportsComponent;
  let fixture: ComponentFixture<PartialReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartialReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
