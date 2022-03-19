import { CoporateApiService } from './../../../services/coporate-api.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  PatternValidator,
} from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-corp-customer',
  templateUrl: './add-corp-customer.component.html',
  styleUrls: ['./add-corp-customer.component.scss'],
  providers: [MessageService],
})
export class AddCorpCustomerComponent implements OnInit {
  UserID = JSON.parse(localStorage.getItem('user') || '{}')?.ID;
  UserRole = JSON.parse(localStorage.getItem('user') || '{}')?.Role;
  AccountType: any = [];
  customerStatus: any = [];
  RequestTypes: any = [];
  tomorrow = new Date();
  corporateForm!: FormGroup;
  RequestTypeID!: FormControl;
  AccountNumber!: FormControl;
  name!: FormControl;
  mobile!: FormControl;
  CompanyName!: FormControl;
  CompanyAddress!: FormControl;
  CompanyType!: FormControl;
  AccountTypeID!: FormControl;
  CustomerStatusID!: FormControl;
  LinesNumber!: FormControl;
  Comment!: FormControl;
  ContactDate: FormControl;
  pattern = '^01[0-2,5]{1}[0-9]{8}$';

  // create init Values
  constructor(
    private corporateApiService: CoporateApiService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
  ) {
    this.initFormControl();
    this.createForm();
  }
  initFormControl() {
    this.AccountNumber = new FormControl('', [Validators.required]);
    this.name = new FormControl('', Validators.required);
    this.mobile = new FormControl('', [
      Validators.required,
      Validators.pattern(this.pattern),
    ]);
    this.CompanyName = new FormControl('', Validators.required);
    this.CompanyAddress = new FormControl('', Validators.required);
    this.CompanyType = new FormControl('', Validators.required);
    this.AccountTypeID = new FormControl('', Validators.required);
    this.CustomerStatusID = new FormControl('', Validators.required);
    this.LinesNumber = new FormControl('', Validators.required);
    this.RequestTypeID = new FormControl('', Validators.required);
    this.Comment = new FormControl('', Validators.required);
    this.ContactDate = new FormControl('', Validators.required);
  }

  createForm() {
    this.corporateForm = new FormGroup({
      AccountNumber: this.AccountNumber,
      name: this.name,
      mobile: this.mobile,
      CompanyName: this.CompanyName,
      CompanyAddress: this.CompanyAddress,
      CompanyType: this.CompanyType,
      AccountTypeID: this.AccountTypeID,
      CustomerStatusID: this.CustomerStatusID,
      LinesNumber: this.LinesNumber,
      RequestTypeID: this.RequestTypeID,
      Comment: this.Comment,
      ContactDate: this.ContactDate,
    });
  }
  onSubmit() {
    document.getElementById('button')?.setAttribute('disabled', 'true');
    this.corporateApiService
      .addCorporateCustomer(this.corporateForm.value, this.UserID)
      .subscribe((res: any) => {
        if (res.status === 'successfully') {
          this.corporateForm.reset();
          this.addCustomerSuucessFuly();
        } else {
          this.ErrorInAddeddCustomer();
        }
      });
    document.getElementById('button')?.removeAttribute('disabled');
  }

  ngOnInit(): void {
    this.getLookupsForCorporate();
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
  getLookupsForCorporate() {
    this.corporateApiService.getCorporateLookups().subscribe((res: any) => {
      this.AccountType = res.Lookups.AccountType;
      this.customerStatus = res.Lookups.CustomerStatus;
      this.RequestTypes = res.Lookups.RequestType;
      this.cdr.detectChanges();
    });
  }
}
