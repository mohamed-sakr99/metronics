import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CoporateApiService } from 'src/app/services/coporate-api.service';

@Component({
  selector: 'app-corp-customer-edit',
  templateUrl: './corp-customer-edit.component.html',
  styleUrls: ['./corp-customer-edit.component.scss'],
  providers: [MessageService],
})
export class CorpCustomerEditComponent implements OnInit {
  CorporateID: any;
  UserID = JSON.parse(localStorage.getItem('user') || '{}')?.ID;
  UserRole = JSON.parse(localStorage.getItem('user') || '{}')?.Role;
  page: any = 1;
  PageLimit: any = 25;
  AccountType: any = [];
  customerStatus: any = [];
  RequestTypes: any = [];
  editCorporateForm!: FormGroup;
  AccountNumber!: FormControl;
  RequestTypeID!: FormControl;
  name!: FormControl;
  mobile!: FormControl;
  CompanyName!: FormControl;
  CompanyAddress!: FormControl;
  CompanyType!: FormControl;
  AccountTypeID!: FormControl;
  CustomerStatusID!: FormControl;
  LinesNumber!: FormControl;
  Comment!: FormControl;
  ContactDate!: FormControl;
  RejectedReason!: FormControl;
  pattern = '^01[0-2,5]{1}[0-9]{8}$';
  accountTypeid: any;
  CustomerStatusid: any;
  isShowStatus: boolean = false;
  isShowRejectedReason: boolean = false;
  private unsubscribe: Subscription[] = [];

  constructor(
    private corporateApiService: CoporateApiService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.initFormGroup();
    this.createForm();
  }

  initFormGroup() {
    this.AccountNumber = new FormControl('');
    this.name = new FormControl('');
    this.mobile = new FormControl('');
    this.CompanyName = new FormControl('');
    this.CompanyAddress = new FormControl('');
    this.CompanyType = new FormControl('');
    this.AccountTypeID = new FormControl('');
    this.CustomerStatusID = new FormControl('');
    this.LinesNumber = new FormControl('');
    this.RequestTypeID = new FormControl('');
    this.Comment = new FormControl('');
    this.ContactDate = new FormControl('');
    this.RejectedReason = new FormControl('');
  }

  createForm() {
    this.editCorporateForm = new FormGroup({
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
      RejectedReason: this.RejectedReason,
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
  ngOnInit(): void {
    this.CorporateID = this.route.snapshot.paramMap.get('id');
    this.getLookupsForCorporate();
    this.corporateApiService
      .editCorporateCustomer(+this.CorporateID)
      .subscribe((res: any) => {
        this.accountTypeid = res.Corporate.AccountTypeID;
        this.CustomerStatusid = res.Corporate.CustomerStatusID;
        this.editCorporateForm = new FormGroup({
          AccountNumber: new FormControl(
            res.Corporate['AccountNumber'],
            Validators.required
          ),
          name: new FormControl(res.Corporate['Name'], Validators.required),
          mobile: new FormControl(res.Corporate['Mobile'], [
            Validators.required,
            Validators.pattern(this.pattern),
          ]),
          CompanyName: new FormControl(
            res.Corporate['CompanyName'],
            Validators.required
          ),
          CompanyAddress: new FormControl(
            res.Corporate['CompanyAddress'],
            Validators.required
          ),
          CompanyType: new FormControl(
            res.Corporate['CompanyType'],
            Validators.required
          ),
          AccountTypeID: new FormControl(
            res.Corporate['AccountTypeID'],
            Validators.required
          ),
          CustomerStatusID: new FormControl(
            res.Corporate['CustomerStatusID'],
            Validators.required
          ),
          LinesNumber: new FormControl(
            res.Corporate['LinesNumber'],
            Validators.required
          ),
          RequestTypeID: new FormControl(
            res.Corporate['RequestTypeID'],
            Validators.required
          ),
          ContactDate: new FormControl(
            res.Corporate['ContactDate'],
            Validators.required
          ),
          Comment: new FormControl(
            res.Corporate['Comment'],
            Validators.required
          ),
          RejectedReason: new FormControl(
            res.Corporate['RejectedReason'],
            Validators.required
          ),
        });
        this.hideAndShowStatusOnLoad(this.accountTypeid);
        this.hideAndShowRejectedReasononLoad(this.CustomerStatusid);
        this.cdr.detectChanges();
      });
  }

  hideAndShowStatusOnLoad(value: any) {
    console.log('value', value);

    if (value === 30) {
      this.isShowStatus = true;
      this.setValidation('CustomerStatusID');
    } else {
      this.isShowStatus = false;
      this.clearValidation('CustomerStatusID');
      this.CustomerStatusID.reset();
      // this.hideAndShowRejectedReason();
    }
  }

  hideAndShowRejectedReasononLoad(value: any) {
    if (value === 17) {
      this.isShowRejectedReason = true;
      this.setValidation('RejectedReason');
    } else {
      this.isShowRejectedReason = false;
      this.clearValidation('RejectedReason');
      this.RejectedReason.reset();
    }
  }
  hideAndShowStatus(statusHTMLElement: any) {
    if (statusHTMLElement.value === '30') {
      this.isShowStatus = true;
      this.setValidation('CustomerStatusID');
    } else {
      this.isShowStatus = false;
      this.clearValidation('CustomerStatusID');
      this.CustomerStatusID.reset();
      this.hideAndShowRejectedReasononLoad(this.CustomerStatusid);
    }
  }

  hideAndShowRejectedReason(statusHTMLElement: any) {
    if (statusHTMLElement.value === '17') {
      this.isShowRejectedReason = true;
      this.setValidation('RejectedReason');
    } else {
      this.isShowRejectedReason = false;
      this.clearValidation('RejectedReason');
      this.RejectedReason.reset();
    }
  }
  setValidation(controlName: any) {
    this.editCorporateForm.controls[controlName].setValidators(
      Validators.required
    );
    this.editCorporateForm.controls[controlName].updateValueAndValidity();
  }

  clearValidation(controlName: any) {
    this.editCorporateForm.controls[controlName].clearValidators();
    this.editCorporateForm.controls[controlName].updateValueAndValidity();
  }
  updateCurrentCutomerForm() {
    document.getElementById('button-1')?.setAttribute('disabled', 'true');
    this.corporateApiService
      .UpdateCurrentCorporateCustomer(
        this.editCorporateForm.value,
        this.UserID,
        this.CorporateID
      )
      .subscribe((res: any) => {
        if (res?.status === 'successfully') {
          this.editedCutomer();
          setTimeout(() => {
            this.router.navigate(['/corp/corp-list']);
          }, 2500);
        } else {
          this.ErrorInEditedCustomer();
        }
        document.getElementById('button')?.removeAttribute('disabled');
      });
  }
  editedCutomer() {
    this.messageService.add({
      severity: 'success',
      summary: 'you modified Customer Successfly',
      detail: 'تم تعديل عميل بنجاح',
    });
  }
  ErrorInEditedCustomer() {
    this.messageService.add({
      severity: 'error',
      summary: 'Customer not modifided Yet',
      detail: 'لم يتم تعديل العميل بعد',
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
