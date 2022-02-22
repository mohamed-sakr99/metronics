import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
  providers: [MessageService],
})
export class AddCustomerComponent implements OnInit {
  governorate: any = [];
  todayDate = new Date();
  offers: any = [];
  quota: any = [];
  providerService: any = [];
  cutomerStatus: any = [];
  routerType: any = [];
  customerType: any = [];
  GovernateID: any;
  cities: any = [];
  RequestTypes: any = [];
  deliverMethod: any = [];
  UserID = JSON.parse(localStorage.getItem('user') || '{}')?.ID;
  tomorrow = new Date(this.todayDate.getTime());
  myForm!: FormGroup;
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
  ContactDate!: FormControl;
  RequestTypeID!: FormControl;
  Comment!: FormControl;
  constructor(
    private apiservice: ApiService,
    private cdr: ChangeDetectorRef,
    public messageService: MessageService
  ) {
    this.initFromcontrol();
    this.createForm();
  }

  // create init values
  initFromcontrol() {
    this.customerTypeID = new FormControl('', Validators.required);
    this.RequestNumber = new FormControl('', Validators.required);
    this.name = new FormControl('', Validators.required);
    this.nationalId = new FormControl('', Validators.required);
    this.address = new FormControl('', Validators.required);
    this.fixedLine = new FormControl('', Validators.required);
    this.nearestFixedLine = new FormControl('', Validators.required);
    this.mobile = new FormControl('', Validators.required);
    this.governorateID = new FormControl('', Validators.required);
    this.city = new FormControl('', Validators.required);
    this.District = new FormControl('', Validators.required);
    this.SpecialMark = new FormControl('', Validators.required);
    this.central = new FormControl('', Validators.required);
    this.serviceProviderID = new FormControl('', Validators.required);
    this.offerID = new FormControl('', Validators.required);
    this.serviceQuotaID = new FormControl('', Validators.required);
    this.customerStatusID = new FormControl('', Validators.required);
    this.RouterTypeID = new FormControl('', Validators.required);
    this.RouterDeliveryMethodID = new FormControl('', Validators.required);
    this.ContactDate = new FormControl('', Validators.required);
    this.RequestTypeID = new FormControl('', Validators.required);
    this.Comment = new FormControl();
  }

  // create form
  createForm() {
    this.myForm = new FormGroup({
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
    });
  }
  onSubmit() {
    document.getElementById('button')?.setAttribute('disabled', 'true');
    this.apiservice
      .addCutomerService(this.myForm.value, this.UserID)
      .subscribe((res: any) => {
        if (res.status === 'successfully') {
          this.myForm.reset();
          this.addCustomerSuucessFuly();
        } else {
          this.ErrorInAddeddCustomer();
        }
        document.getElementById('button')?.removeAttribute('disabled');
      });
  }
  ngOnInit(): void {
    this.getAddCustLookups();
  }
  addCustomerSuucessFuly() {
    this.messageService.add({
      severity: 'success',
      summary: 'you added Customer Successfly',
      detail: 'تم اضافة عميل بنجاح',
    });
  }
  ErrorInAddeddCustomer() {
    this.messageService.add({
      severity: 'error',
      summary: 'Customer not Added Yet',
      detail: 'لم يتم اضافة عميل بعد',
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
    });
  }

  changeOffer(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.apiservice.getOffer(value).subscribe((res: any) => {
      this.offers = res.Lookups.Offer;
    });
  }

  changetStatus(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    if (value === '17') {
      this.setValidation('Comment');
    } else {
      this.clearValidation('Comment');
    }
  }

  setValidation(controlName: any) {
    this.myForm.controls[controlName].setValidators(Validators.required);
    this.myForm.controls[controlName].updateValueAndValidity();
  }

  clearValidation(controlName: any) {
    this.myForm.controls[controlName].clearValidators();
    this.myForm.controls[controlName].updateValueAndValidity();
  }
}
