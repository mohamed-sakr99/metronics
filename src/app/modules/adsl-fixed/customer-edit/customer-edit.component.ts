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
  ) {}

  editCustomer = new FormGroup({
    RequestNumber: new FormControl(''),
    customerTypeID: new FormControl(''),
    name: new FormControl(''),
    nationalId: new FormControl(''),
    address: new FormControl(''),
    fixedLine: new FormControl(''),
    nearestFixedLine: new FormControl(''),
    mobile: new FormControl(''),
    governorateID: new FormControl(''),
    city: new FormControl(''),
    District: new FormControl(''),
    SpecialMark: new FormControl(''),
    central: new FormControl(''),
    serviceProviderID: new FormControl(''),
    offerID: new FormControl(''),
    serviceQuotaID: new FormControl(''),
    customerStatusID: new FormControl(''),
    RouterTypeID: new FormControl(''),
    RouterDeliveryMethodID: new FormControl(''),
    ContactDate: new FormControl(''),
    RequestTypeID: new FormControl(''),
    Comment: new FormControl(''),
    RejectedReason: new FormControl(''),
  });
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
            res?.Customer['RequestNumber'],
            Validators.required
          ),
          customerTypeID: new FormControl(
            res?.Customer['CustomerTypeID'],
            Validators.required
          ),
          name: new FormControl(res.Customer['Name'], Validators.required),
          nationalId: new FormControl(
            res?.Customer['NationalId'],
            Validators.required
          ),
          address: new FormControl(
            res?.Customer['Address'],
            Validators.required
          ),
          fixedLine: new FormControl(
            res?.Customer['FixedLine'],
            Validators.required
          ),
          nearestFixedLine: new FormControl(
            res?.Customer['NearestFixedLine'],
            Validators.required
          ),
          mobile: new FormControl(res?.Customer['Mobile'], [
            Validators.required,
            Validators.pattern(this.pattern),
          ]),
          governorateID: new FormControl(
            res?.Customer['GovernorateID'],
            Validators.required
          ),
          city: new FormControl(res?.Customer['City'], Validators.required),
          District: new FormControl(
            res?.Customer['District'],
            Validators.required
          ),
          SpecialMark: new FormControl(
            res?.Customer['SpecialMark'],
            Validators.required
          ),
          central: new FormControl(
            res?.Customer['Central'],
            Validators.required
          ),
          serviceProviderID: new FormControl(
            res?.Customer['ServiceProviderID'],
            Validators.required
          ),
          offerID: new FormControl(
            res?.Customer['OfferID'],
            Validators.required
          ),
          serviceQuotaID: new FormControl(
            res?.Customer['ServiceQuotaID'],
            Validators.required
          ),
          customerStatusID: new FormControl(
            res?.Customer['CustomerStatusID'],
            Validators.required
          ),
          RouterTypeID: new FormControl(
            res?.Customer['RouterTypeID'],
            Validators.required
          ),
          RouterDeliveryMethodID: new FormControl(
            res?.Customer['RouterDeliveryMethodID'],
            Validators.required
          ),
          ContactDate: new FormControl(
            res?.Customer['ContactDate'],
            Validators.required
          ),
          RequestTypeID: new FormControl(
            res?.Customer['RequestTypeID'],
            Validators.required
          ),
          Comment: new FormControl(
            res?.Customer['Comment'],
            Validators.required
          ),
          RejectedReason: new FormControl(
            res?.Customer['RejectedReason'],
            Validators.required
          ),
        });
        console.log('>>', this.customerType);

        this.changetStatus();
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
    if (this.customerType == 22) {
      this.isShowFixedLine = true;
      this.setValidation('fixedLine');
      this.isShowNearstFixedLine = false;
      this.clearValidation('nearestFixedLine');
      this.editCustomer.get('nearestFixedLine')?.reset();
      this.isShowRouterAndRouterDeliveryMethod = true;
      this.setValidation('RouterTypeID');
      this.setValidation('RouterDeliveryMethodID');
      if (
        this.editCustomer.get('customerStatusID')?.value == 15 ||
        this.editCustomer.get('customerStatusID')?.value == 18
      ) {
        this.isShowRequestNumber = true;
        this.setValidation('RequestNumber');
        this.isShowRejectedReason = false;
        this.clearValidation('RejectedReason');
        this.editCustomer.get('RejectedReason')?.reset();
      } else if (this.editCustomer.get('customerStatusID')?.value == 17) {
        this.isShowRejectedReason = true;
        this.setValidation('RejectedReason');
        this.isShowRequestNumber = false;
        this.clearValidation('RequestNumber');
        this.editCustomer.get('RequestNumber')?.reset();
      } else {
        this.isShowRequestNumber = false;
        this.clearValidation('RequestNumber');
        this.editCustomer.get('RequestNumber')?.reset();
        this.isShowRejectedReason = false;
        this.clearValidation('RejectedReason');
        this.editCustomer.get('RejectedReason')?.reset();
      }
    } else if (this.customerType == 23 || this.customerType == 24) {
      console.log('>>>', this.customerType);

      if (this.customerType == 23) {
        this.isShowRouterAndRouterDeliveryMethod = false;
        this.clearValidation('RouterTypeID');
        this.clearValidation('RouterDeliveryMethodID');
        this.editCustomer.get('RouterTypeID')?.reset();
        this.editCustomer.get('RouterDeliveryMethodID')?.reset();
      } else {
        this.isShowRouterAndRouterDeliveryMethod = true;
        this.setValidation('RouterTypeID');
        this.setValidation('RouterDeliveryMethodID');
      }
      this.isShowNearstFixedLine = true;
      this.setValidation('nearestFixedLine');
      if (
        this.editCustomer.get('customerStatusID')?.value == 15 ||
        this.editCustomer.get('customerStatusID')?.value == 18
      ) {
        this.isShowRequestNumber = true;
        this.setValidation('RequestNumber');
        this.isShowFixedLine = false;
        this.clearValidation('fixedLine');
        this.editCustomer.get('fixedLine')?.reset();
        this.isShowRejectedReason = false;
        this.clearValidation('RejectedReason');
        this.editCustomer.get('RejectedReason')?.reset();
      } else if (this.editCustomer.get('customerStatusID')?.value == 17) {
        this.isShowRejectedReason = true;
        this.setValidation('RejectedReason');
        this.isShowRequestNumber = false;
        this.clearValidation('RequestNumber');
        this.editCustomer.get('RequestNumber')?.reset();
        this.isShowFixedLine = false;
        this.clearValidation('fixedLine');
        this.editCustomer.get('fixedLine')?.reset();
      } else if (
        this.editCustomer.get('customerStatusID')?.value == 63 ||
        this.editCustomer.get('customerStatusID')?.value == 66
      ) {
        this.isShowFixedLine = true;
        this.setValidation('fixedLine');
        this.isShowRequestNumber = false;
        this.clearValidation('RequestNumber');
        this.editCustomer.get('RequestNumber')?.reset();
        this.isShowRejectedReason = false;
        this.clearValidation('RejectedReason');
        this.editCustomer.get('RejectedReason')?.reset();
      } else {
        this.isShowRequestNumber = false;
        this.clearValidation('RequestNumber');
        this.editCustomer.get('RequestNumber')?.reset();
        this.isShowFixedLine = false;
        this.clearValidation('fixedLine');
        this.editCustomer.get('fixedLine')?.reset();
        this.isShowRejectedReason = false;
        this.clearValidation('RejectedReason');
        this.editCustomer.get('RejectedReason')?.reset();
      }
    } else {
      this.isShowRequestNumber = false;
      this.clearValidation('RequestNumber');
      this.editCustomer.get('RequestNumber')?.reset();
      this.isShowFixedLine = false;
      this.clearValidation('fixedLine');
      this.editCustomer.get('fixedLine')?.reset();
      this.isShowNearstFixedLine = false;
      this.clearValidation('nearestFixedLine');
      this.editCustomer.get('nearestFixedLine')?.reset();
      this.isShowRejectedReason = false;
      this.clearValidation('RejectedReason');
      this.editCustomer.get('RejectedReason')?.reset();
      this.isShowRouterAndRouterDeliveryMethod = false;
      this.clearValidation('RouterTypeID');
      this.clearValidation('RouterDeliveryMethodID');
      this.editCustomer.get('RouterTypeID')?.reset();
      this.editCustomer.get('RouterDeliveryMethodID')?.reset();
    }
  }

  setValidation(controlName: any) {
    this.editCustomer.controls[controlName].setValidators(Validators.required);
    this.editCustomer.controls[controlName].updateValueAndValidity();
  }

  clearValidation(controlName: any) {
    this.editCustomer.controls[controlName].clearValidators();
    this.editCustomer.controls[controlName].updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
