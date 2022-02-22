import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomersDetailsService } from 'src/app/services/customers-details.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit {
  customerInfo: any = {};
  customerHistory: any = [];
  private unsubscribe: Subscription[] = [];

  constructor(
    private customersDetailsService: CustomersDetailsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.customerInformation();
  }

  customerInformation() {
    this.customersDetailsService
      .getCustomerInfo(this.route.snapshot.params.id)
      .subscribe((res: any) => {
        this.customerInfo = res.Customer;
        this.customerHistory = res.History;
        console.log('this.customerInfo', res);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
