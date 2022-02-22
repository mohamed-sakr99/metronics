import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDropdownMenuComponent } from './list-of-dropdown-menu.component';

describe('ListOfDropdownMenuComponent', () => {
  let component: ListOfDropdownMenuComponent;
  let fixture: ComponentFixture<ListOfDropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfDropdownMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
