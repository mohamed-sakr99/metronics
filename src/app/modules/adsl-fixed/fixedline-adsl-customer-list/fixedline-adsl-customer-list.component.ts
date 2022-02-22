import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomersDetailsService } from 'src/app/services/customers-details.service';

@Component({
  selector: 'app-fixedline-adsl-customer-list',
  templateUrl: './fixedline-adsl-customer-list.component.html',
  styleUrls: ['./fixedline-adsl-customer-list.component.scss'],
})
export class FixedlineAdslCustomerListComponent implements OnInit {
  fixedAndAdslCustomers: any = [];
  UserID = JSON.parse(localStorage.getItem('user') || '{}')?.ID;
  UserRole = JSON.parse(localStorage.getItem('user') || '{}')?.Role;
  page: any = 1;
  PageLimit: any = 25;
  CustomerType: any = 24;
  totalCount: any;
  SearchText: any;

  private unsubscribe: Subscription[] = [];

  constructor(
    private customerDetailsService: CustomersDetailsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAdslAndFixedLineCustomerList();
  }
  getAdslAndFixedLineCustomerList() {
    this.customerDetailsService
      .getCustomerList(
        this.UserID,
        this.UserRole,
        this.CustomerType,
        this.page,
        this.PageLimit,
        this.SearchText
      )
      .subscribe((res: any) => {
        this.fixedAndAdslCustomers = res.Customers;
        this.totalCount = res.TotalCount;
        this.cdr.detectChanges();
      });
  }
  onPageChange(event: any) {
    this.page = event.page + 1;
    this.getAdslAndFixedLineCustomerList();
  }

  onSearch() {
    this.getAdslAndFixedLineCustomerList();
  }
  onClear() {
    this.SearchText = '';
    this.getAdslAndFixedLineCustomerList();
  }
  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
