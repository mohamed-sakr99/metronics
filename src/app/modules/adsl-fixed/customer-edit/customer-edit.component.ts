import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CustomersDetailsService } from 'src/app/services/customers-details.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
  providers: [MessageService],
})
export class CustomerEditComponent implements OnInit {
  serviceProvID: any;
  serviceQotaID: any;
  UserID = JSON.parse(localStorage.getItem('user') || '{}')?.ID;
  UserRole = JSON.parse(localStorage.getItem('user') || '{}')?.Role;
  page: any = 1;
  PageLimit: any = 25;
  CustomerType: any;
  totalCount: any;
  governorate: any = [];
  todayDate = new Date();
  offers: any = [];
  RequestTypes: any = [];
  quota: any = [];
  providerService: any = [];
  cutomerStatus: any = [];
  routerType: any = [];
  customerType: any = [];
  GovernateID: any;
  cities: any = [];
  deliverMethod: any = [];
  createdBy = JSON.parse(localStorage.getItem('user') || '{}')?.ID;
  tomorrow = new Date(this.todayDate.getTime());
  editCustomer!: FormGroup;
  RequestNumber!: FormControl;
  customerTypeID!: FormControl;
  name!: FormControl;
  nationalId!: FormControl;
  address!: FormControl;
  fixedLine!: FormControl;
  nearestFixedLine!: FormControl;
  mobile!: FormControl;
  governorateID!: FormControl;
  city!: FormControl;
  District!: FormControl;
  SpecialMark!: FormControl;
  central!: FormControl;
  serviceProviderID!: FormControl;
  offerID!: FormControl;
  serviceQuotaID!: FormControl;
  customerStatusID!: FormControl;
  RouterTypeID!: FormControl;
  RouterDeliveryMethodID!: FormControl;
  RequestTypeID!: FormControl;
  ContactDate!: FormControl;
  Comment!: FormControl;
  RejectedReason!: FormControl;
  CustomerID: any;
  pattern = '^01[0-2,5]{1}[0-9]{8}$';

  isShowRequestNumber: boolean = false;
  isShowFixedLine: boolean = false;
  isShowNearstFixedLine: boolean = false;
  isShowRouterAndRouterDeliveryMethod: boolean = false;
  isShowRejectedReason: boolean = false;

  private unsubscribe: Subscription[] = [];

  constructor(
    private apiservice: ApiService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private customersDetailsService: CustomersDetailsService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.initFormControl();
    this.createForm();
  }
  initFormControl() {
    this.RequestNumber = new FormControl('');
    this.customerTypeID = new FormControl('');
    this.name = new FormControl('');
    this.nationalId = new FormControl('');
    this.address = new FormControl('');
    this.fixedLine = new FormControl('');
    this.nearestFixedLine = new FormControl('');
    this.mobile = new FormControl('');
    this.governorateID = new FormControl('');
    this.city = new FormControl('');
    this.District = new FormControl('');
    this.SpecialMark = new FormControl('');
    this.central = new FormControl('');
    this.serviceProviderID = new FormControl('');
    this.offerID = new FormControl('');
    this.serviceQuotaID = new FormControl('');
    this.customerStatusID = new FormControl('');
    this.RouterTypeID = new FormControl('');
    this.RouterDeliveryMethodID = new FormControl('');
    this.ContactDate = new FormControl('');
    this.RequestTypeID = new FormControl('');
    this.Comment = new FormControl('');
    this.RejectedReason = new FormControl('');
  }

  createForm() {
    this.editCustomer = new FormGroup({
      customerTypeID: this.customerTypeID,
      RequestNumber: this.RequestNumber,
      name: this.name,
      nationalId: this.nationalId,
      address: this.address,
      fixedLine: this.fixedLine,
      nearestFixedLine: this.nearestFixedLine,
      mobile: this.mobile,
      governorateID: this.governorateID,
      city: this.city,
      District: this.District,
      SpecialMark: this.SpecialMark,
      central: this.central,
      serviceProviderID: this.serviceProviderID,
      offerID: this.offerID,
      serviceQuotaID: this.serviceQuotaID,
      customerStatusID: this.customerStatusID,
      RouterTypeID: this.RouterTypeID,
      RouterDeliveryMethodID: this.RouterDeliveryMethodID,
      ContactDate: this.ContactDate,
      RequestTypeID: this.RequestTypeID,
      Comment: this.Comment,
      RejectedReason: this.RejectedReason,
    });
  }

  ngOnInit(): void {
    this.CustomerID = this.route.snapshot.paramMap.get('id');

    this.getAddCustLookups();
    this.customersDetailsService
      .getCustomerDetails(+this.CustomerID)
      .subscribe((res: any) => {
        this.customerType = res.Customer.CustomerTypeID;

        this.serviceProvID = res.Customer.ServiceProviderID;
        this.addInOfferQuota(this.serviceProvID);
        this.serviceQotaID = res.Customer.ServiceQuotaID;
        this.addInServiceOffers(this.serviceQotaID);
        this.editCustomer = new FormGroup({
          RequestNumber: new FormControl(
            res.Customer['RequestNumber'],
            Validators.required
          ),
          customerTypeID: new FormControl(
            res.Customer['CustomerTypeID'],
            Validators.required
          ),
          name: new FormControl(res.Customer['Name'], Validators.required),
          nationalId: new FormControl(
            res.Customer['NationalId'],
            Validators.required
          ),
          address: new FormControl(
            res.Customer['Address'],
            Validators.required
          ),
          fixedLine: new FormControl(
            res.Customer['FixedLine'],
            Validators.required
          ),
          nearestFixedLine: new FormControl(
            res.Customer['NearestFixedLine'],
            Validators.required
          ),
          mobile: new FormControl(res.Customer['Mobile'], [
            Validators.required,
            Validators.pattern(this.pattern),
          ]),
          governorateID: new FormControl(
            res.Customer['GovernorateID'],
            Validators.required
          ),
          city: new FormControl(res.Customer['City'], Validators.required),
          District: new FormControl(
            res.Customer['District'],
            Validators.required
          ),
          SpecialMark: new FormControl(
            res.Customer['SpecialMark'],
            Validators.required
          ),
          central: new FormControl(
            res.Customer['Central'],
            Validators.required
          ),
          serviceProviderID: new FormControl(
            res.Customer['ServiceProviderID'],
            Validators.required
          ),
          offerID: new FormControl(
            res.Customer['OfferID'],
            Validators.required
          ),
          serviceQuotaID: new FormControl(
            res.Customer['ServiceQuotaID'],
            Validators.required
          ),
          customerStatusID: new FormControl(
            res.Customer['CustomerStatusID'],
            Validators.required
          ),
          RouterTypeID: new FormControl(
            res.Customer['RouterTypeID'],
            Validators.required
          ),
          RouterDeliveryMethodID: new FormControl(
            res.Customer['RouterDeliveryMethodID'],
            Validators.required
          ),
          ContactDate: new FormControl(
            res.Customer['ContactDate'],
            Validators.required
          ),
          RequestTypeID: new FormControl(
            res.Customer['RequestTypeID'],
            Validators.required
          ),
          Comment: new FormControl(
            res.Customer['Comment'],
            Validators.required
          ),
          RejectedReason: new FormControl(
            res.Customer['RejectedReason'],
            Validators.required
          ),
        });
        this.cdr.detectChanges();
      });
  }

  updateForm() {
    document.getElementById('button-2')?.setAttribute('disabled', 'true');
    this.customersDetailsService
      .updateCurrentCustomer(
        this.editCustomer.value,
        this.UserID,
        this.CustomerID
      )
      .subscribe((res: any) => {
        if (res.status === 'successfully') {
          this.editedCust();
          if (this.customerType == 22) {
            this.router.navigate(['/adsl-list']);
          } else if (this.customerType == 23) {
            this.router.navigate(['/fixed-list']);
          } else {
            this.router.navigate(['/fixed-adsl']);
          }
        } else {
          this.ErrorInEditedCust();
        }
        document.getElementById('button-2')?.removeAttribute('disabled');
      });
  }

  editedCust() {
    this.messageService.add({
      severity: 'success',
      summary: 'you modified Customer Successfly',
      detail: 'تم تعديل عميل بنجاح',
    });
  }
  ErrorInEditedCust() {
    this.messageService.add({
      severity: 'error',
      summary: 'Customer not modifided Yet',
      detail: 'لم يتم تعديل عميل بعد',
    });
  }

  addInOfferQuota(serviceProvID: any) {
    this.apiservice
      .GetServiceQuota(this.serviceProvID)
      .subscribe((res: any) => {
        this.quota = res.Lookups.ServiceQuota;
        this.cdr.detectChanges();
      });
  }

  addInServiceOffers(ServiceQota: any) {
    this.apiservice.getOffer(this.serviceQotaID).subscribe((res: any) => {
      this.offers = res.Lookups.Offer;
      this.cdr.detectChanges();
    });
  }
  getAddCustLookups() {
    this.apiservice.getAddCustomerLookUps().subscribe((res: any) => {
      this.customerType = res.Lookups.CustomerType;
      this.governorate = res.Lookups.Governorate;
      this.providerService = res.Lookups.ServiceProvider;
      this.cutomerStatus = res.Lookups.CustomerStatus;
      this.routerType = res.Lookups.RouterType;
      this.deliverMethod = res.Lookups.RouterDeliveryMethod;
      this.RequestTypes = res.Lookups.RequestType;

      this.cdr.detectChanges();
    });
  }

  providerChange(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.apiservice.GetServiceQuota(value).subscribe((res: any) => {
      this.quota = res.Lookups.ServiceQuota;
      this.cdr.detectChanges();
    });
  }

  changetStatus() {
    console.log('=>', this.customerStatusID.value);
    if (this.customerStatusID.value == 17) {
      this.isShowRejectedReason = true;
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
