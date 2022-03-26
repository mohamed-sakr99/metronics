import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  customerHistoryComments: any = [];
  customerHistoryStatus: any = [];
  customerHistoryRejectedReason: any = [];
  private unsubscribe: Subscription[] = [];

  constructor(
    private customersDetailsService: CustomersDetailsService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.customerInformation();
  }

  customerInformation() {
    this.customersDetailsService
      .getCustomerInfo(this.route.snapshot.params.id)
      .subscribe((res: any) => {
        console.log('res--', res);

        this.customerInfo = res.Customer;
        this.customerHistoryComments = res?.CommentsHistory;
        this.customerHistoryStatus = res?.StatusHistory;
        this.customerHistoryRejectedReason = res?.RejectedReasonHistory;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
