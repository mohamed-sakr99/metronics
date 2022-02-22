import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoporateApiService } from 'src/app/services/coporate-api.service';

@Component({
  selector: 'app-corp-customer-list',
  templateUrl: './corp-customer-list.component.html',
  styleUrls: ['./corp-customer-list.component.scss'],
})
export class CorpCustomerListComponent implements OnInit {
  corporateCustomer: any = [];
  UserID = JSON.parse(localStorage.getItem('user') || '{}')?.ID;
  UserRole = JSON.parse(localStorage.getItem('user') || '{}')?.Role;
  Page: any = 1;
  PageLimit: any = 20;
  totalCount: any;
  SearchText: any;

  private unsubscribe: Subscription[] = [];

  constructor(
    private corporateApiService: CoporateApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCustomerForCorporate();
  }

  getCustomerForCorporate() {
    this.corporateApiService
      .getCorporateCustomerList(
        this.UserID,
        this.UserRole,
        this.Page,
        this.PageLimit,
        this.SearchText
      )
      .subscribe((res: any) => {
        this.corporateCustomer = res.Corporates;
        this.totalCount = res.TotalCount;
        this.cdr.detectChanges();
      });
  }
  onPageChange(event: any) {
    this.Page = event.page + 1;
    this.getCustomerForCorporate();
  }
  onSearch() {
    this.getCustomerForCorporate();
  }

  onClear() {
    this.SearchText = '';
    this.getCustomerForCorporate();
  }
  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
