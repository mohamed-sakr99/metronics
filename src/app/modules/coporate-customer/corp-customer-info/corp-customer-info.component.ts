import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoporateApiService } from 'src/app/services/coporate-api.service';

@Component({
  selector: 'app-corp-customer-info',
  templateUrl: './corp-customer-info.component.html',
  styleUrls: ['./corp-customer-info.component.scss'],
})
export class CorpCustomerInfoComponent implements OnInit {
  corpotareCustomerInfo: any = {};
  corporateCustomerHistory: any = [];
  corporateStatusHistory: any = [];
  corporateRejectedHistory: any = [];

  constructor(
    private corporateApiService: CoporateApiService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getInfoForCoprpCust();
  }

  getInfoForCoprpCust() {
    this.corporateApiService
      .getCorporateCustomerInfo(this.route.snapshot.params.id)
      .subscribe((res: any) => {
        console.log('res=>', res);
        this.corpotareCustomerInfo = res?.Corporate;
        this.corporateCustomerHistory = res?.CommentsHistory;
        this.corporateStatusHistory = res?.StatusHistory;
        this.corporateRejectedHistory = res?.RejectedReasonHistory;
        this.cdr.detectChanges();
      });
  }
}
