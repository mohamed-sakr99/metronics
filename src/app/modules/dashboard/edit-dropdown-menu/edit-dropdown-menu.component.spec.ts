import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDropdownMenuComponent } from './edit-dropdown-menu.component';

describe('EditDropdownMenuComponent', () => {
  let component: EditDropdownMenuComponent;
  let fixture: ComponentFixture<EditDropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDropdownMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
