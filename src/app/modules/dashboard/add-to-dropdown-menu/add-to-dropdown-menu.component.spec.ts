import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToDropdownMenuComponent } from './add-to-dropdown-menu.component';

describe('AddToDropdownMenuComponent', () => {
  let component: AddToDropdownMenuComponent;
  let fixture: ComponentFixture<AddToDropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToDropdownMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
