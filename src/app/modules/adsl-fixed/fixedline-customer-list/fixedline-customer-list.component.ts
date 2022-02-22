import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomersDetailsService } from 'src/app/services/customers-details.service';

@Component({
  selector: 'app-fixedline-customer-list',
  templateUrl: './fixedline-customer-list.component.html',
  styleUrls: ['./fixedline-customer-list.component.scss'],
})
export class FixedlineCustomerListComponent implements OnInit {
  fixedCutomers: any = [];
  UserID = JSON.parse(localStorage.getItem('user') || '{}')?.ID;
  UserRole = JSON.parse(localStorage.getItem('user') || '{}')?.Role;
  CustomerType = 23;
  page: any = 1;
  PageLimit: any = 20;
  totalCount: any;
  SearchText: any;

  private unsubscribe: Subscription[] = [];

  constructor(
    private customersDetailsService: CustomersDetailsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getFixedLineCustomerList();
  }

  getFixedLineCustomerList() {
    this.customersDetailsService
      .getCustomerList(
        this.UserID,
        this.UserRole,
        this.CustomerType,
        this.page,
        this.PageLimit,
        this.SearchText
      )
      .subscribe((res: any) => {
        this.fixedCutomers = res.Customers;
        this.totalCount = res.TotalCount;
        this.cdr.detectChanges();
      });
  }
  onPageChange(event: any) {
    this.page = event.page + 1;
    this.getFixedLineCustomerList();
  }

  onSearch() {
    this.getFixedLineCustomerList();
  }

  onClear() {
    this.SearchText = '';
    this.getFixedLineCustomerList();
  }
  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
