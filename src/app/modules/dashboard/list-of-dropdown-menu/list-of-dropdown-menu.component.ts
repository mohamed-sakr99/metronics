import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DropDownMenusService } from 'src/app/services/dashboard/drop-down-menus.service';

@Component({
  selector: 'app-list-of-dropdown-menu',
  templateUrl: './list-of-dropdown-menu.component.html',
  styleUrls: ['./list-of-dropdown-menu.component.scss'],
})
export class ListOfDropdownMenuComponent implements OnInit {
  UserID = JSON.parse(localStorage.getItem('user') || '{}').ID;
  lookupsCategory: any = [];
  List = [];
  Page: any = 1;
  PageLimit: any = 25;
  totalCount: any;
  categoryID: any = 1;
  constructor(
    private dropDownMenusService: DropDownMenusService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getDropDownCategory();
    this.listService();
  }

  getDropDownCategory() {
    this.dropDownMenusService.getCategoryLookups().subscribe((res: any) => {
      this.lookupsCategory = res.Categories;
      console.log('result', res);
    });
  }

  categoryChange(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.categoryID = value;
    this.listService();
  }

  onPageChange(page: any) {
    this.listService();
  }
  updateStatusList(ID: any) {
    this.dropDownMenusService
      .editLookupStatus(ID, this.UserID)
      .subscribe((res: any) => {
        if (res.status === 'successfully') {
          this.listService();
        }
        this.cdr.detectChanges();
      });
  }
  listService() {
    this.dropDownMenusService
      .getLookupList(this.Page, this.PageLimit, this.categoryID)
      .subscribe((res: any) => {
        this.List = res.Lookups;
        this.totalCount = res.TotalCount;
        this.cdr.detectChanges();
      });
  }
}
