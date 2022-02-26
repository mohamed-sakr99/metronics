import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomersDetailsService } from 'src/app/services/customers-details.service';

@Component({
  selector: 'app-adsl-customer-list',
  templateUrl: './adsl-customer-list.component.html',
  styleUrls: ['./adsl-customer-list.component.scss'],
})
export class AdslCustomerListComponent implements OnInit {
  customers: any = [];
  UserID = JSON.parse(localStorage.getItem('user') || '{}')?.ID;
  UserRole = JSON.parse(localStorage.getItem('user') || '{}')?.Role;
  CustomerType = 22;
  page = 1;
  PageLimit = 25;
  totalCount: any;
  SearchText: any;

  private unsubscribe: Subscription[] = [];

  constructor(
    private cutomerDetailsService: CustomersDetailsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCustomerListForAdsl();
  }

  getCustomerListForAdsl() {
    this.cutomerDetailsService
      .getCustomerList(
        this.UserID,
        this.UserRole,
        this.CustomerType,
        this.page,
        this.PageLimit,
        this.SearchText
      )
      .subscribe((res: any) => {
        this.customers = res.Customers;
        this.totalCount = res.TotalCount;
        this.cdr.detectChanges();
      });
  }
  onPageChange(page: any) {
    this.getCustomerListForAdsl();
  }
  onSearch() {
    this.getCustomerListForAdsl();
  }

  onClear() {
    this.SearchText = '';
    this.getCustomerListForAdsl();
  }
  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
